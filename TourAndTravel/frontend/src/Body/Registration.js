import React, {
  Component,
  state,
  submitUser,
  changeHandler,
  inputHandler,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class Registration extends Component {
  state = {
    fname: "",
    lname: "",
    phone: "",
    username: "",
    password: "",
    profile: null,
    type: "Customer",
    fnameError: "",
    lnameError: "",
    phoneError: "",
    usernameError: "",
    passwordError: "",
    phoneLength: "",
    phoneString: "",
    pLen: false,
    pStr: false,
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  inputHandler = (e) => {
    this.setState({
      profile: e.target.files[0],
      loaded: 0,
    });
    console.log(e.target.files[0]);
  };

  validate() {
    let fnameError = "";
    let lnameError = "";
    let usernameError = "";
    let phoneError = "";
    let passwordError = "";
    let phoneLength = "";
    let phoneString = "";
    let pStr = false;
    let pLen = false;
    // let  onlyNum = /^\d+$/

    if (!this.state.fname) {
      fnameError = "First name cannot be blank";
    }

    if (!this.state.password) {
      passwordError = "Password cannot be blank";
    }

    if (!this.state.lname) {
      lnameError = "Last name cannot be blank";
    }

    if (!this.state.phone) {
      phoneError = "Phone cannot be blank";
    }

    if (this.state.phone != null && this.state.phone.length != 10) {
      pLen = true;
      phoneLength = "Enter 10 digit number";
    }

    // if (onlyNum.test(this.state.phone)) {
    //   pStr = false;
    //   phoneString = "Only numbers are allowed";
    // }

    if (!this.state.username) {
      usernameError = "Username cannot be blank";
    }

    if (
      usernameError ||
      fnameError ||
      lnameError ||
      phoneError ||
      passwordError ||
      pLen === true ||
      pStr === true
    ) {
      this.setState({
        usernameError,
        fnameError,
        lnameError,
        phoneError,
        passwordError,
        phoneLength,
        phoneString,
      });
      return false;
    }

    return true;
  }

  submitUser = (e) => {
    e.preventDefault();

    const isValid = this.validate();

    const userData = new FormData();
    userData.append("fname", this.state.fname);
    userData.append("lname", this.state.lname);
    userData.append("phone", this.state.phone);
    userData.append("username", this.state.username);
    userData.append("password", this.state.password);
    userData.append("profile", this.state.profile);
    userData.append("type", this.state.type);

    if (isValid) {
      axios
        .post("http://localhost:3000/insert", userData)
        .then((response) => {
          toast.success("Registration Success");
          window.location.href = "/login";
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  render() {
    return (
      <div>
        <ToastContainer />

        <div className="container hello">
          <div className="row py-5 mt-4 align-items-center">
            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
              <h2 className="mb-3">CREATE A FREE ACCOUNT</h2>
              <img
                src="https://cdn.dribbble.com/users/1223630/screenshots/8115260/media/8145a871d9c4d67ec06e047ccc6574b4.gif"
                alt=""
                className="img-fluid mb-3 d-none d-md-block"
              />
            </div>

            <div className="col-md-7 col-lg-6 ml-auto">
              <form>
                <div className="row">
                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-user text-muted" />
                      </span>
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      name="fname"
                      value={this.state.fname}
                      placeholder="First Name"
                      onChange={this.changeHandler}
                      className="form-control bg-white border-left-0 border-md"
                    />
                    <div style={{ fontSize: 12, color: "red" }}></div>
                    <div>{this.state.fnameError}</div>
                  </div>

                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-user text-muted" />
                      </span>
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      name="lname"
                      value={this.state.lname}
                      placeholder="Last Name"
                      onChange={this.changeHandler}
                      className="form-control bg-white border-left-0 border-md"
                    />
                    <div style={{ fontSize: 12, color: "red" }}></div>
                    <div>{this.state.lnameError}</div>
                  </div>

                  <div className="input-group col-lg-12 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-envelope text-muted" />
                      </span>
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="username"
                      value={this.state.username}
                      placeholder="Username"
                      onChange={this.changeHandler}
                      className="form-control bg-white border-left-0 border-md"
                    />
                    <div style={{ fontSize: 12, color: "red" }}></div>
                    <div>{this.state.usernameError}</div>
                  </div>

                  <div className="input-group col-lg-12 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-phone-square text-muted" />
                      </span>
                    </div>
                    <select
                      id="countryCode"
                      name="countryCode"
                      width="80"
                      className="custom-select form-control bg-white border-left-0 border-md h-100 font-weight-bold text-muted"
                    >
                      <option value="">+977</option>
                      <option value="">+10</option>
                      <option value="">+15</option>
                      <option value="">+18</option>
                    </select>
                    <input
                      id="phoneNumber"
                      type="number"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.changeHandler}
                      placeholder="Phone Number"
                      className="form-control bg-white border-md border-left-0 pl-3"
                    />
                    <div style={{ fontSize: 15, color: "red" }}>
                      {this.state.phoneError} <br></br>
                      {this.state.phoneLength}
                    </div>
                  </div>
                  {/* <br></br> */}
                  {/* <div>{this.state.phoneLength}</div> */}

                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-lock text-muted" />
                      </span>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.changeHandler}
                      name="password"
                      placeholder="Password"
                      className="form-control bg-white border-left-0 border-md"
                    />
                    <div style={{ fontSize: 12, color: "red" }}></div>
                    <div>{this.state.passwordError}</div>
                  </div>

                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-lock text-muted" />
                      </span>
                    </div>
                    <input
                      id="passwordConfirmation"
                      onChange={this.changeHandler}
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Confirm Password"
                      className="form-control bg-white border-left-0 border-md"
                    />
                    <div style={{ fontSize: 12, color: "red" }}></div>
                    <div>{this.state.passwordError}</div>
                  </div>
                  <div className="form-group col-lg-12 mx-auto mb-0">
                    <label className="filebutton mt-2">
                      Select Picture
                      <span>
                        <input
                          type="file"
                          name="profile"
                          onChange={this.inputHandler}
                          className="font-weight-bold"
                        />
                      </span>
                    </label>
                  </div>

                  <div className="form-group col-lg-12 mx-auto mb-0">
                    <a href="#" className="btn btn-primary btn-block py-2">
                      <button
                        className="btn btn-primary"
                        onClick={this.submitUser}
                      >
                        Create your account
                      </button>
                    </a>
                  </div>

                  <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                    <div className="border-bottom w-100 ml-5" />
                    <span className="px-2 small text-muted font-weight-bold text-muted">
                      OR
                    </span>
                    <div className="border-bottom w-100 mr-5" />
                  </div>

                  <div className="form-group col-lg-12 mx-auto">
                    <a
                      href="#"
                      className="btn btn-primary btn-block py-2 btn-facebook"
                    >
                      <i className="fa fa-facebook-f mr-2" />
                      <span className="font-weight-bold">
                        Continue with Facebook
                      </span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-primary btn-block py-2 btn-twitter"
                    >
                      <i className="fa fa-twitter mr-2" />
                      <span className="font-weight-bold">
                        Continue with Twitter
                      </span>
                    </a>
                  </div>

                  <div className="text-center w-100">
                    <p className="text-muted font-weight-bold">
                      Already Registered?{" "}
                      <a href="#" className="text-primary ml-2">
                        <Link to="/login">Login</Link>
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
