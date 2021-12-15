import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrder } from "../actions/orderActions";
import LoadingComponent from "../components/LoadingComponent";

export default function OrderListScreen(props) {
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const orderListData = useSelector((state) => state.orderList);
  const { orderList, loading, error } = orderListData;

  useEffect(() => {
    dispatch(listOrder(userInfo._id));
  }, [dispatch]);

  if (!userInfo) {
    props.history.push("/");
  }

  const dateHandler = (displayDate) => {
    var d = new Date(displayDate);
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var newDate = year + "/" + month + "/" + date;
    return newDate;
  };

  return loading ? (
    <LoadingComponent></LoadingComponent>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <div className="container">
      <h1 className="title has-text-centered mt-4">Your orders</h1>
      <table className="table is-fullwidth is-striped is-bordered">
        <thead>
          <tr>
            <th>Order id</th>
            <th>Order paid at</th>
            <th>Total order price</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr>
              <td>
                <Link to={`/order/${order.paymentResult.id}`}>
                  {order.paymentResult.id}
                </Link>
              </td>

              <td>{dateHandler(order.paidAt)}</td>
              <td>{order.itemsPrice.toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
