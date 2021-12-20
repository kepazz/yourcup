import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../actions/userActions";

export default function Navbar() {
  const [isActive, setisActive] = useState(false);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  return (
    <nav
      class="navbar nav-color"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <Link class="navbar-item" to="/">
          <img src={"/images/hello.png"} width="125" alt="logo"></img>
        </Link>

        <div
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          class={`navbar-burger ${isActive ? "is-active" : ""} `}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div
        id="navbarBasicExample"
        class={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div class="navbar-start">
          <Link to="/" class="navbar-item">
            <p>Home</p>
          </Link>

          <Link to="/articles" class="navbar-item">
            <p>Articles</p>
          </Link>

          <Link to="/coffee" class="navbar-item">
            <p>Coffee</p>
          </Link>

          <div class="navbar-item has-dropdown is-hoverable">
            <Link to="/coffee" class="navbar-link">
              <p>Tea</p>
            </Link>

            <div class="navbar-dropdown ">
              <Link to="/blacktea" class="navbar-item">
                Black tea
              </Link>
              <Link to="/greentea" class="navbar-item">
                Green tea
              </Link>
            </div>
          </div>
          <Link to="/cup" class="navbar-item">
            <p>Cups</p>
          </Link>

          {userInfo && (
            <Link to="/favorites" class="navbar-item">
              <p>Favorites</p>
            </Link>
          )}

          {userInfo && userInfo.isAdmin && (
            <div class="navbar-item has-dropdown is-hoverable">
              <Link to="/coffee" class="navbar-link">
                <p>Admin</p>
              </Link>

              <div class="navbar-dropdown ">
                <Link to="/dashboard" class="navbar-item">
                  <p>Dashboard</p>
                </Link>
                <Link to="/pendingorders" class="navbar-item">
                  <p>Pending orders</p>
                </Link>
                <Link to="/sendorders" class="navbar-item">
                  <p>Send orders</p>
                </Link>
                <Link to="/product_add" class="navbar-item">
                  <p>Product add</p>
                </Link>
                <Link to="/article_add" class="navbar-item">
                  <p>Article add</p>
                </Link>
                <Link to="/brand_modify" class="navbar-item">
                  <p>Brands</p>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div class="navbar-end">
          <Link to="/cart" class="navbar-item">
            Shopping cart (<span>&nbsp;</span>
            <strong>
              {cartItems.length > 0 && cartItems.reduce((a, c) => a + c.qty, 0)}
              <span>&nbsp;</span>{" "}
            </strong>
            )
          </Link>

          {userInfo ? (
            <div class="navbar-item has-dropdown is-hoverable mr-1">
              <Link to="/" class="navbar-link">
                {userInfo.name}
              </Link>

              <div class="navbar-dropdown is-right">
                <Link to="/orders" class="navbar-item">
                  Orders
                </Link>
                <Link to="/update" class="navbar-item">
                  Update password
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    dispatch(signOut());
                  }}
                  class="navbar-item"
                >
                  Sign out
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register" class="navbar-item">
                Sign up
              </Link>
              <Link to="/signin" class="navbar-item">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
