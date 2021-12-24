import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../actions/userActions";
import { toast } from 'react-toastify';
import ToastComponent from "../../components/ToastComponent";
import LoadingComponent from "../../components/LoadingComponent";



export default function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error  } = userSignIn;

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
        <h1 className="py-5">Sign in </h1>
      </div>
      <section class="hero halfheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered ">
              <div class="column is-one-third  is-offset-one-third box">
                <form onSubmit={submitHandler} autoComplete="off">
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
                  </div>
                  <p>
                    Dont have an account ?
                    <Link to="/register"> Create one</Link>{" "}
                  </p>
                 
                  
                  {error && <p className="has-text-danger pt-3">Sign in failed</p>}
                   
                  {loading ? (<LoadingComponent></LoadingComponent>): (<div class="field has-text-centered">
                    <button class="button btn-prim is-rounded">Login</button>
                   
                  </div>)}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
