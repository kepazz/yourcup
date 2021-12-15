import React, { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder } from "../actions/orderActions";
import LoadingComponent from "../components/LoadingComponent";

export default function OrderScreen(props) {
  const dispatch = useDispatch();
  const orderIdFromUrl = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    dispatch(detailsOrder(orderIdFromUrl));
  }, [dispatch]);

  return loading ? (
    <LoadingComponent></LoadingComponent>
  ) : error ? (
    <p>{error}</p>
  ) : userInfo._id !== order.user ? (
    <p>blogas useriazas</p>
  ) : (
    <div className="container">
      <h1 className="has-text-centered mt-3 is-size-3">
        Order : {order.paymentResult.id}
        <p>
          {" "}
          <strong>{order.paymentResult.status}</strong>
        </p>
      </h1>
      <div className="content">
        <ul className="is-size-5">
          <p>Shipping information: </p>
          <li>
            {" "}
            <strong>Name: </strong>
            {order.shippingInformation.name}
          </li>
          <li>
            <strong>Surname: </strong>
            {order.shippingInformation.surname}
          </li>
          <li>
            <strong>Address: </strong>
            {order.shippingInformation.address},{" "}
            {order.shippingInformation.postalCode}{" "}
            {order.shippingInformation.city} (
            {order.shippingInformation.country}){" "}
          </li>
        </ul>
      </div>
      {order.orderItems.map((item) => (
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
          <hr />
        </div>
      ))}

      <div className="columns is-mobile">
        <div className="column is-three-fifths is-offset-one-fifth has-text-centered">
          <div className="is-size-3">
            Total items: {order.orderItems.reduce((a, c) => a + c.qty, 0)}x
          </div>
          <div className="is-size-3 ">
            Total items price:{" "}
            {order.orderItems
              .reduce((a, c) => a + c.price * c.qty, 0)
              .toFixed(2)}{" "}
            €
          </div>
        </div>
      </div>
    </div>
  );
}
