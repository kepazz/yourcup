import React from "react";

export default function UserOrderSummary(props) {
  const { orderData } = props.location.state;
  return (
    <>
      <div className="container">
        <h1 className="has-text-centered mt-3 is-size-3">
          Order : {orderData.paymentResult.id}
          <p>
            {" "}
            <strong>{orderData.paymentResult.status}</strong>
          </p>
        </h1>
        <div className="content">
          <ul className="is-size-5">
            <li>
              {" "}
              <strong>Name: </strong>
              {orderData.shippingInformation.name}
            </li>
            <li>
              <strong>Surname: </strong>
              {orderData.shippingInformation.surname}
            </li>
            <li>
              <strong>Address: </strong>
              {orderData.shippingInformation.address},{" "}
              {orderData.shippingInformation.postalCode}{" "}
              {orderData.shippingInformation.city} (
              {orderData.shippingInformation.country}){" "}
            </li>
          </ul>
        </div>
        {orderData.orderItems.map((item) => (
          <div>
            <div className="columns has-text-centered is-vcentered">
              <div className="column ">
                <img src={item.image} className="img-cart" alt={item.name} />
              </div>
              <div className="column is-size-5">{item.name}</div>
              <div className="column is-size-5">
                Unit price: {item.price.toFixed(2)} €
              </div>
              <div className="column is-size-5">{item.qty} x </div>
              <div className="column is-size-5">
                Total price: {(item.price * item.qty).toFixed(2)}€
              </div>
            </div>
            <hr className="mx-4" />
          </div>
        ))}

        <div className="columns is-mobile">
          <div className="column is-three-fifths is-offset-one-fifth has-text-centered">
            <div className="is-size-3">
              Total items: {orderData.orderItems.reduce((a, c) => a + c.qty, 0)}
              x
            </div>
            <div className="is-size-3 ">
              Total items price:{" "}
              {orderData.orderItems
                .reduce((a, c) => a + c.price * c.qty, 0)
                .toFixed(2)}{" "}
              €
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
