import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../actions/userActions";
import LoadingComponent from "../../components/LoadingComponent";

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
        <h1 className="py-5">Update password</h1>
        <hr className="mx-4" />
      </div>

      <section class="hero halfheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered ">
              <div class="column is-one-third  is-offset-one-third box">
                <form onSubmit={submitHandler} autoComplete="off">
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

                  {error && (
                    <p className="has-text-danger-dark pt-3">
                      Password change failed
                    </p>
                  )}
                  {success && (
                    <p className="has-text-success-dark pt-3">
                     Password was changed 
                    </p>
                  )}

                  {loading ? (
                    <LoadingComponent></LoadingComponent>
                  ) : (
                    <div class="field has-text-centered">
                      <button class="button btn-prim is-rounded">Submit</button>
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
