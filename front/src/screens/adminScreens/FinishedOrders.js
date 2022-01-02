import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listOrdersByStatus,
  OrderStatusChange,
} from "../../actions/orderActions";
import LoadingComponent from "../../components/LoadingComponent";
import Modal from "react-modal";
import { Link } from "react-router-dom";

export default function FinishedOrders() {
  const dispatch = useDispatch();
  const orderListByStatus = useSelector((state) => state.orderListByStatus);
  const { loading, error, orderList } = orderListByStatus;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

 

  useEffect(() => {
    dispatch(listOrdersByStatus("finished"));
  }, [dispatch]);

  const dateHandler = (displayDate) => {
    var d = new Date(displayDate);
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var newDate = year + "/" + month + "/" + date;
    return newDate;
  };

  const statusChangeHandler = (orderId) => {
    dispatch(OrderStatusChange(orderId, "send"));
  };

  return (
    <div>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <p>sorry mate there is an error </p>
      ) : (
        <>
          <div className="container">
            <div className="content is-medium has-text-centered">
              <h1 className="py-5">Pending orders</h1>
              <hr className="mx-4" />
            </div>
            <div className="table-container">
              <table className="table is-fullwidth is-bordered ">
                <thead>
                  <tr>
                    <th>Order Items in total</th>
                    <th>Shipping information</th>
                    <th>Items price</th>
                    <th>Price Vat</th>
                    <th>User</th>
                    <th>Paid at</th>
                    <th>Payment id</th>
                    <th>Payment status</th>
                  </tr>
                </thead>
                <tbody className="">
                  {orderList.map((item) => (
                    <tr key={item._id} className="table-is-selected">
                      <td>{item.orderItems.reduce((a, c) => a + c.qty, 0)}x</td>
                      <td>
                        <p>{item.shippingInformation.name}</p>
                        <p>{item.shippingInformation.surname}</p>
                        <p>
                          {item.shippingInformation.address} (
                          {item.shippingInformation.postalCode},
                          {item.shippingInformation.country})
                        </p>
                        <p>{item.shippingInformation.city}</p>
                      </td>
                      <td>{item.itemsPrice}</td>
                      <td>{item.priceVAT}</td>
                      <td>
                        <Link to={`/user_summary/${item.user}`}>
                          <p>{item.user}</p>
                        </Link>
                      </td>
                      <td>{dateHandler(item.paidAt)}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/order_summary/${item.paymentResult.id}`,
                            state: { orderData: item },
                          }}
                        >
                          {item.paymentResult.id}
                        </Link>
                      </td>
                      <td>
                        <p
                          className="pointer"
                          onClick={() => {
                            setModalData(item);
                            setModalIsOpen(true);
                          }}
                        >
                          {item.paymentResult.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Order Items in total</th>
                    <th>Shipping information</th>
                    <th>Items price</th>
                    <th>Price Vat</th>
                    <th>User</th>
                    <th>Paid at</th>
                    <th>Payment id</th>
                    <th>Payment status</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {modalData && (
            <div
              className={`modal  ${modalIsOpen ? "is-active" : ""}`}
              
            >
              <div class="modal-background "></div>
              <div class="modal-content box mx-2">
                <p className="title has-text-centered">Order items: </p>
                <p className="subtitle has-text-centered">Status: {modalData.paymentResult.status} </p>
                {modalData.orderItems.map((item) => (
                  <div>
                    <div className="columns has-text-centered is-vcentered">
                      <div className="column is-3 is-6-mobile is-offset-3-mobile">
                        <figure class="image is-3by4 is-clickable">
                          <img src={item.image} alt={item.name} />
                        </figure>
                        <p>
                          <span>{item.name}</span>
                        </p>
                      </div>

                      <div className="column ">
                        Unit price: {item.price.toFixed(2)} €
                      </div>
                      <div className="column ">{item.qty} x</div>
                    </div>
                    <hr />
                  </div>
                ))}
                {modalData.paymentResult.status === "cancelled" && (<><p className="title has-text-centered">Cancel reason: </p>
                <p>{modalData.cancelMessage}</p> <hr/></>) }
                <div className="has-text-centered">
                    <button className="button is-rounded is-danger is-centered" onClick={() => {
                setModalIsOpen(!modalIsOpen);
                setModalData(null);
              }}>Turn off</button>
                </div>
                
              </div>

              
              <button class="modal-close is-large" aria-label="close" onClick={() => {
                setModalIsOpen(!modalIsOpen);
                setModalData(null);
              }}></button>
            </div>
          )}
          
        </>
      )}
    </div>
  );
}
