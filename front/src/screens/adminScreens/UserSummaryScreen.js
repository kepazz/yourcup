import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderListByUser } from "../../actions/orderActions";
import LoadingComponent from "../../components/LoadingComponent";

export default function UserSummaryScreen(props) {
  const dispatch = useDispatch();
  const userId = props.match.params.id;
  const orderListByStatus = useSelector((state) => state.orderListByUser);
  const { loading, error, summary } = orderListByStatus;

  useEffect(() => {
    dispatch(orderListByUser(userId));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <p>klaiduze</p>
      ) : (
        <div>
          <div class="content container">
            <h2 class="title has-text-centered">Summary about user </h2>
            <ul>
              <li>
                <strong>User id:</strong> {userId}
              </li>
              <li>
                <strong>User name:</strong> {summary.userName}
              </li>
              <li>
                <strong>User email:</strong> {summary.userEmail}
              </li>
              <li>
                <strong>Created at: </strong>
                {summary.userCreatedAt}
              </li>
              <li>
                <strong>Total orders: </strong>
              </li>
              <li className="ml-5">
                <strong>Active orders: </strong>
                {summary.activeOrders}
              </li>
              <li className="ml-5">
                <strong>Finished orders: </strong>
                {summary.finishedOrders}
              </li>
              <li>
                <strong>Total spend: </strong>
                {summary.totalSpend}
              </li>
              <li>
                <strong>Total VAT: </strong>
                {summary.totalVat}
              </li>
            </ul>
            <hr/>
            <table className='table is-fullwidth is-bordered'>
              <thead>
                <tr>
                  <th>Payment id</th>
                  <th>Payment result</th>
                  <th>Paid at</th>
                </tr>
              </thead>
              <tbody>
              {summary.orders.map((order)=>
              <tr>
                <td><Link to={{pathname :`/order_summary/${order.paymentResult.id}`, state: {orderData: order}}}>{order.paymentResult.id}</Link></td>
                <td>{order.paymentResult.status}</td>
                <td>{order.paidAt}</td>
              </tr>
              )}
            </tbody></table>
            
          </div>
        </div>
      )}
    </>
  );
}
