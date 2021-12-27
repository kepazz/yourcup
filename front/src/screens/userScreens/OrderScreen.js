import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder, OrderStatusChangeByUser } from "../../actions/orderActions";
import LoadingComponent from "../../components/LoadingComponent";

export default function OrderScreen(props) {
  const dispatch = useDispatch();
  const orderIdFromUrl = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const [modalActive, setModalActive] = useState(false);
  const [modalData, setmodalData] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    dispatch(detailsOrder(orderIdFromUrl));
  }, [dispatch]);

  const finishOrderHandler = () => {
    dispatch(
      OrderStatusChangeByUser(orderIdFromUrl, "arrived", "empty message")
    );
    setModalActive(!modalActive);
      setmodalData(null);
  };
  const cancelOrderHandler = () => {
    if (cancelReason !== "") {
      dispatch(
        OrderStatusChangeByUser(orderIdFromUrl, "cancelled", cancelReason)
      );
      setModalActive(!modalActive);
      setmodalData(null);
    } else {
      alert("enter reason");
    }
  };

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
      <div className="buttons is-centered">
        {order.paymentResult.status === "send" && (
          <button
            className="button is-success is-rounded"
            onClick={() => {
              setModalActive(!modalActive);
              setmodalData("arrived");
            }}
          >
            Arrived
          </button>
        )}
        {order.paymentResult.status === "finished" ? (
          <></>
        ) : order.paymentResult.status === "cancelled" ? (
          <></>
        ) : (
          <button
            className="button is-danger is-rounded"
            onClick={() => {
              setModalActive(!modalActive);
              setmodalData("cancel");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {modalData && (
        <div className={`modal  ${modalActive ? "is-active" : ""}`}>
          <div class="modal-background "></div>
          <div class="modal-content box has-text-centered">
            {modalData === "arrived" ? (
              <>
                <p className="title">Are u sure it arrived ?</p>
                <div className="buttons is-centered">
                  <button
                    className="button is-success is-rounded"
                    onClick={finishOrderHandler}
                  >
                    Arrived
                  </button>
                  <button
                    className="button is-danger is-rounded"
                    onClick={() => {
                      setModalActive(!modalActive);
                      setmodalData(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="title">Order cancel</p>
                <div class="field ml-2">
                  <label htmlFor="description" class="label">
                    Cancel reason
                  </label>
                  <div class="control">
                    <textarea
                      id="description"
                      type="text"
                      class="textarea"
                      placeholder="Enter reason"
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                  </div>
                </div>
                <div className="buttons is-centered">
                  <button
                    className="button is-success is-rounded"
                    onClick={cancelOrderHandler}
                  >
                    Submit
                  </button>
                  <button
                    className="button is-danger is-rounded"
                    onClick={() => {
                      setModalActive(!modalActive);
                      setmodalData(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
          <button
            class="modal-close is-large"
            aria-label="close"
            onClick={() => {
              setModalActive(!modalActive);
              setmodalData(null);
            }}
          ></button>
        </div>
      )}
    </div>
  );
}
