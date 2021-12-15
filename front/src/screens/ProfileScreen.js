import React from "react";
import { useSelector } from "react-redux";

export default function ProfileScreen(props) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  if (!userInfo) {
    props.history.push("/");
  }
  const ordersHandler = () => {
    props.history.push("/orders");
  };
  const updatePasswordHandler = () => {
    props.history.push("/update");
  };
  return (
    <div className="card">
      <h1>Profile</h1>
      <button className="stripe-button button-minimised" onClick={updatePasswordHandler}>
        Update account password
      </button>
      <button className="stripe-button button-minimised" onClick={ordersHandler}>
        Orders
      </button>
    </div>
  );
}
