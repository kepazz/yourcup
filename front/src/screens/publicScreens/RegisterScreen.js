import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions/userActions";

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
      alert("passwords dont match");
    } else {
      dispatch(register(name, email, password));
      console.log(error);
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
              <div class="column is-one-third  is-offset-one-third">
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
                  type="confirmPassword"
                  class="input"
                  placeholder="Enter confirm password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <p>Have account already? <Link to='/signin'>Sign in</Link></p>

            <div class="field has-text-centered">
              <br/>
              <button class="button btn-prim is-rounded">Register</button>
            </div>
          </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
