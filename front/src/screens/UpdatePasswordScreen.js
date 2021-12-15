import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../actions/userActions";
import LoadingComponent from "../components/LoadingComponent";

export default function UpdatePasswordScreen(props) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { loading, error, success } = userUpdatePassword;

  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  if (!userInfo) {
    props.history.push("/");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      password !== newPassword &&
      password !== confirmNewPassword &&
      newPassword === confirmNewPassword
    ) {
      dispatch(updateUserPassword({ password, newPassword }));
    } else {
      alert("try other new passowrd");
    }
  };
  return loading ? (
    <LoadingComponent></LoadingComponent>
  ) : (
    <div className="container">
      <div className="content is-medium has-text-centered">
        <h1>Update password</h1>
        {error && <h1>{error}</h1>}
        {success && <h1>Pasikeitet slaptazodi</h1>}
      </div>

      <div className="columns is-centered">
        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
          <form onSubmit={submitHandler} autocomplete="off">
            <div class="field">
              <label htmlFor="password" class="label">
                Current password
              </label>
              <div class="control">
                <input
                  id="password"
                  type="password"
                  class="input"
                  placeholder="Enter password "
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
            </div>

            <div class="field">
              <label htmlFor="newPassword" class="label">
                New password
              </label>
              <div class="control">
                <input
                  id="newPassword"
                  type="password"
                  class="input"
                  placeholder="Enter new password "
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div class="field">
              <label htmlFor="confirmNewPassword" class="label">
                Confirm new password
              </label>
              <div class="control">
                <input
                  id="confirmNewPassword"
                  type="password"
                  class="input"
                  placeholder="Enter new password"
                  required
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              
            </div>
            <div class="field">
              <button class="button is-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
