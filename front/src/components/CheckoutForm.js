import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../stylesheets/Stripe.css";
import { useDispatch } from "react-redux";
import { createOrder } from "../actions/orderActions";
import {
  removeItemsFromCart,
  removeShippingInformation,
} from "../actions/cartActions";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [isPaid, setIsPaid] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          dispatch(
            createOrder({
              orderItems: props.cartItems,
              shippingInformation: props.shippingInformation,
              paymentResult: {
                id: paymentIntent.id,
                status: paymentIntent.status,
              },
              itemsPrice: props.cartItems.reduce(
                (a, c) => a + c.price * c.qty,
                0
              ),
              priceVAT:
                (props.cartItems.reduce((a, c) => a + c.price * c.qty, 0) *
                  21) /
                100,
            })
          );
          dispatch(removeShippingInformation());
          dispatch(removeItemsFromCart());
          setIsPaid(true);
          setPaymentId(paymentIntent.id);

          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://yoourcup.herokuapp.com/checkout",
      },
    });
    /* 
    http://localhost:3000/checkout 
    https://yoourcup.herokuapp.com/checkout
    */

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <div className="stripe-form ">
      {isPaid !== true && (
        <form id="payment-form " onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="stripe-button"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                `Pay now ${props.price.toFixed(2)} €`
              )}
            </span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      )}

      {isPaid && (
        <div className="has-text-centered">
        {message}<br/>
        <button
          className="button btn-prim is-rounded"
          onClick={() => props.paymentData(paymentId)}
        >
          Continue
        </button>
        </div>
      )}
    </div>
  );
}
