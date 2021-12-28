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
            <p>
              <strong>Home</strong>
            </p>
          </Link>

          <Link to="/articles" class="navbar-item">
            <p>
              {" "}
              <strong>Articles</strong>
            </p>
          </Link>

          <Link to="/beverages" class="navbar-item">
            <p>
              <strong>Beverages</strong>
            </p>
          </Link>

          <Link to="/tools" class="navbar-item">
            <p>
              <strong>Tools</strong>
            </p>
          </Link>

          

          {userInfo && (
            <Link to="/favorites" class="navbar-item">
              <p>
                <strong>Favorites</strong>
              </p>
            </Link>
          )}

          {userInfo && userInfo.isAdmin && (
            <div class="navbar-item has-dropdown is-hoverable">
              <Link to="/#" class="navbar-link">
                <p>
                  <strong>Admin</strong>
                </p>
              </Link>

              <div class="navbar-dropdown ">
                <Link to="/finished" class="navbar-item">
                  <p>
                    <strong>Finished orders</strong>
                  </p>
                </Link>
                <Link to="/pendingorders" class="navbar-item">
                  <p>
                    <strong>Pending orders</strong>
                  </p>
                </Link>
                <Link to="/sendorders" class="navbar-item">
                  <p>
                    <strong>Send orders</strong>
                  </p>
                </Link>
                <Link to="/product_add" class="navbar-item">
                  <p>
                    <strong>Product add</strong>
                  </p>
                </Link>
                <Link to="/article_add" class="navbar-item">
                  <p>
                    <strong>Article add</strong>
                  </p>
                </Link>
                <Link to="/brand_modify" class="navbar-item">
                  <p>
                    <strong>Brands</strong>
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div class="navbar-end">
          <Link to="/cart" class="navbar-item">
            <strong>
              Shopping cart (<span>&nbsp;</span>
              {cartItems.length > 0 && cartItems.reduce((a, c) => a + c.qty, 0)}
              <span>&nbsp;</span>)
            </strong>
          </Link>

          {userInfo ? (
            <div class="navbar-item has-dropdown is-hoverable mr-1">
              <Link to="/" class="navbar-link">
                <strong>{userInfo.name}</strong>
              </Link>

              <div class="navbar-dropdown is-right">
                <Link to="/orders" class="navbar-item">
                  <strong>Orders</strong>
                </Link>
                <Link to="/update" class="navbar-item">
                  <strong>Update password</strong>
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    dispatch(signOut());
                  }}
                  class="navbar-item"
                >
                  <strong>Sign out</strong>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register" class="navbar-item">
                <strong>Sign up</strong>
              </Link>
              <Link to="/signin" class="navbar-item">
                <strong>Sign in</strong>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
