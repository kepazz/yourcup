import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Jmf2OAQNSScMjXxnBZSpjTDEpM8G5MCMAOSj8wTHwi5d4woa3IywIfc3vT5wZPgxxuyp4F0YF4URd85Xlld1tKw00jk3rHO1x",
  { locale: "en" }
);

export default function CheckoutScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingInformation } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const { cartItems } = cart;
  const [clientSecret, setClientSecret] = useState("");

  if (!shippingInformation) {
    props.history.push("/shipping");
  }
  if (!userInfo) {
    props.history.push("/signin");
  }

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    console.log("miau");
  }, [cartItems]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const paymentData = (payId) => {
    console.log(payId);
    props.history.push(`/order/${payId}`);
  };

  return (
    <div className="App container">
      <div className="content is-medium has-text-centered">
        <h1 className="py-5">Checkout</h1>
        <hr className="mx-4" />
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            price={cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            shippingInformation={shippingInformation}
            cartItems={cartItems}
            paymentData={paymentData}
          />
        </Elements>
      )}
    </div>
  );
}
