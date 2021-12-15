import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../actions/userActions";

export default function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  return (
    <div className="container">
      <div className="content is-medium has-text-centered">
        <h1>sveiki kency</h1>
      </div>

      <div className="columns is-centered">
        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
          <form onSubmit={submitHandler} autocomplete="off">
            <div class="field">
              <label htmlFor="email" class="label">
                Email
              </label>
              <div class="control">
                <input
                  id="email"
                  type="email"
                  class="input"
                  placeholder="Email "
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p class="help is-danger">galimai pakeist veliau</p>
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
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p class="help is-danger">This email is invalid</p>
            </div>
            <div class="field">
              <button class="button is-success">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
