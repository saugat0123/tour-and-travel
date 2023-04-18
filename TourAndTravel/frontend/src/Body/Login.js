import React, { Component, state, Registration, successToast } from "react";
import axios from "axios";

import { Redirect } from "react-router";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

class Login extends Component {
  state = {
    username: "",
    password: "",
    emailError: "",
    passwordError: "",
  };

  validate() {
    let emailError = "";
    let passwordError = "";

    if (!this.state.password) {
      passwordError = "Password cannot be blank";
    }

    if (!this.state.username) {
      emailError = "Username cannot be blank";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  }

  Registration = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    const newdata = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(newdata);
    if (isValid) {
      axios
        .post("http://localhost:3000/login", newdata)
        .then((response) => {
          console.log("userdata:::::::::", response);
          if (response.data.success === true) {
            window.location.reload(false);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.data.UserType);
            localStorage.setItem("username", response.data.data.Username);
            localStorage.setItem("uid", response.data.data._id);

            console.log(localStorage.getItem("user"));
            console.log("userdata:::::::::", response);

            if (localStorage.getItem("user") == "Admin") {
              window.location.href = "/tab";
            }
            if (localStorage.getItem("user") == "Customer") {
              window.location.href = "/";
            }
          } else {
            toast.error(
              <div>
                <i className="fa fa-exclamation-triangle" aria-hidden="true" />{" "}
                Invalid Credentials !
              </div>,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={5000} />

        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-5 bg-image" />
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading">Welcome To TripPlanner</h3>
                      <form className="mt-lg-4">
                        <div className="form-label-group">
                          <input
                            type="email"
                            id="inputEmail"
                            className="form-control"
                            placeholder=" Username"
                            value={this.state.username}
                            onChange={(event) => {
                              this.setState({ username: event.target.value });
                            }}
                            required
                            autofocus
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.emailError}
                          </div>
                        </div>

                        <div className="form-label-group mt-lg-4">
                          <input
                            type="password"
                            id="inputPassword"
                            className="form-control"
                            value={this.state.password}
                            onChange={(event) => {
                              this.setState({ password: event.target.value });
                            }}
                            placeholder="Password"
                            required
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.passwordError}
                          </div>
                        </div>

                        <div className="custom-control custom-checkbox mt-2">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            className="custom-control-label"
                            for="customCheck1"
                          >
                            Remember password
                          </label>
                        </div>
                        <button
                          className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mt-2"
                          onClick={this.Registration}
                          type="submit"
                        >
                          Sign in
                        </button>
                        <div className="text-center mt-1">
                          <a className="small" href="www.fb.com">
                            Forgot password?
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
