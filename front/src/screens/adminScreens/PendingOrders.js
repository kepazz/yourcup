import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listOrdersByStatus,
  orderListByUser,
  OrderStatusChange,
} from "../../actions/orderActions";
import LoadingComponent from "../../components/LoadingComponent";
import Modal from "react-modal";
import { Link } from "react-router-dom";

export default function PendingOrders() {
  const dispatch = useDispatch();
  const orderListByStatus = useSelector((state) => state.orderListByStatus);
  const { loading, error, orderList } = orderListByStatus;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    dispatch(listOrdersByStatus("succeeded"));
  }, [dispatch]);
  //  "succeeded"  |||| 'send'
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
              <hr />
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
                      <td><Link to={{pathname :`/order_summary/${item.paymentResult.id}`, state: {orderData: item}}}>{item.paymentResult.id}</Link></td>
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
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
          >
            {modalData && (
              <div class="modal-content">
                <div>
                  {modalData.orderItems.map((item) => (
                    <div>
                      <div className="columns has-text-centered is-vcentered">
                        <div className="column ">
                          <img
                            src={item.image}
                            className="img-modal"
                            alt={item.name}
                          />
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
                </div>

                <div>
                  <p>
                    <strong>Total price:</strong>{" "}
                    {modalData.itemsPrice.toFixed(2)} €
                  </p>
                  <p>
                    <strong>Total price:</strong>{" "}
                    {modalData.priceVAT.toFixed(2)} €
                  </p>
                  <p>
                    <strong>Status: </strong>
                    <span className="line-through has-text-danger ">
                      {modalData.paymentResult.status}
                    </span>{" "}
                    changes into <span className="has-text-success">Send</span>{" "}
                    after the confirm
                  </p>

                  <div class=" has-text-centered">
                    <button
                      class="button is-success mr-2"
                      onClick={() => {
                        setModalIsOpen(false);
                        statusChangeHandler(modalData.paymentResult.id);
                      }}
                    >
                      Change status
                    </button>
                    <button
                      class="button is-danger"
                      onClick={() => setModalIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  );
}
