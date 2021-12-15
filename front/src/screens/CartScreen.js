import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCartSingleItem } from "../actions/cartActions";

export default function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const removeSingleItemHandler = (itemId) => {
    dispatch(removeFromCartSingleItem(itemId));
  };

  const addToCartHandler = (itemId) => {
    dispatch(addToCart(itemId, 1));
  };

  const checkoutHandler = () => {
    //props.history.push("/shipping");
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <h2>Cart is empty</h2>
      ) : (
        <div className="container">
          <div className="content is-medium has-text-centered">
            <h1>Cart</h1>
          </div>
          {cartItems.map((item) => (
            <div>
              <div className="columns has-text-centered is-vcentered">
                <div className="column ">
                  <img src={item.image} className="img-cart" alt={item.name} />
                </div>
                <div className="column is-size-5">{item.name}</div>
                <div className="column is-size-5">
                  
                  {item.sale === false ? (
          <p>Unit price: {item.price.toFixed(2)} €</p>
        ) : (
          <p>Unit price:
            <span className="line-through has-text-danger">{(item.price*100/(100-item.saleAmount)).toFixed(2)}€</span>{" "}
            <span >{item.price} €</span>{" "}
          </p>
        )}
                  
                </div>
                <div className="column is-size-5">
                  <button
                    class="button is-small is-danger is-rounded"
                    onClick={() => removeSingleItemHandler(item.product)}
                  >
                    -
                  </button>{" "}
                  {item.qty} x{" "}
                  <button
                    class="button is-small is-success is-rounded"
                    onClick={() => addToCartHandler(item.product)}
                  >
                    +
                  </button>
                </div>
                <div className="column is-size-5">
                  Total price: {(item.price * item.qty).toFixed(2)}€
                </div>
              </div>
              <hr />
            </div>
          ))}

          <div className="columns is-mobile">
            <div className="column is-three-fifths is-offset-one-fifth has-text-centered">
              <div className="is-size-3">
                Total items: {cartItems.reduce((a, c) => a + c.qty, 0)}x
              </div>
              <div className="is-size-3 ">
                Total items price:{" "}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}{" "}
                €
              </div>

              <button
                class="button is-medium is-fullwidth is-success is-rounded"
                onClick={checkoutHandler}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
