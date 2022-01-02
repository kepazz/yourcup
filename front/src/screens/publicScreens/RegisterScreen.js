import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions/userActions";
import { toast } from "react-toastify";
import ToastComponent from "../../components/ToastComponent";
import LoadingComponent from "../../components/LoadingComponent";

export default function RegisterScreen(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords dont match !", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="container">
      <div className="content is-medium has-text-centered">
        <h1>Register</h1>
      </div>

      <section class="hero halfheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered ">
              <div class="column is-one-third  is-offset-one-third box">
                <form onSubmit={submitHandler} autocomplete="off">
                  <div class="field">
                    <label htmlFor="name" class="label">
                      Name
                    </label>
                    <div class="control">
                      <input
                        id="name"
                        type="name"
                        class="input"
                        placeholder="Enter name"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label htmlFor="email" class="label">
                      Email
                    </label>
                    <div class="control">
                      <input
                        id="email"
                        type="email"
                        class="input"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label htmlFor="password" class="label">
                      Password
                    </label>
                    <div class="control">
                      <input
                        id="password"
                        type="password"
                        class="input"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label htmlFor="confirmPassword" class="label">
                      Confirm password
                    </label>
                    <div class="control">
                      <input
                        id="confirmPassword"
                        type="password"
                        class="input"
                        placeholder="Enter confirm password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <p>
                    Have account already? <Link to="/signin">Sign in</Link>
                  </p>

                  {error && (
                    <p className="has-text-danger pt-3">Register failed</p>
                  )}

                  {loading ? (
                    <LoadingComponent></LoadingComponent>
                  ) : (
                    <div class="field pt-2 has-text-centered">
                      <button class="button btn-prim is-rounded">
                        Register
                      </button>
                      <ToastComponent />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
