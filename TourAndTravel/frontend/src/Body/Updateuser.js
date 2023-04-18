import axios from "axios";
import React, {
  Component,
  changeHandler,
  state,
  fileHandler,
  updateUser,
  useStyles,
  useState,
} from "react";
import { Alert } from "@material-ui/lab";
import Image from "react-bootstrap/Image";
import Button from "@material-ui/core/Button";

class Updateuser extends Component {
  state = {
    id: "",
    fname: "",
    lname: "",
    phone: "",
    username: "",
    password: "",
    profile: null,
    config: {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  fileHandler = (e) => {
    this.setState({
      profile: e.target.files[0],
    });
    console.log(e.target.files[0]);
  };

  componentDidMount(e) {
    axios
      .get("http://localhost:3000/userDetail", this.state.config)
      .then((response) => {
        this.setState({
          id: response.data.data._id,
          fname: response.data.data.FirstName,
          lname: response.data.data.Lastname,
          phone: response.data.data.PhoneNumber,
          username: response.data.data.Username,
          profile: response.data.data.Profile,
        });
      });
  }

  updateUser = () => {
    const data = new FormData();

    data.append("fname", this.state.fname);
    data.append("lname", this.state.lname);
    data.append("profile", this.state.profile);
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("phone", this.state.phone);
    axios
      .put("http://localhost:3000/update", data, this.state.config)
      .then((response) => {});
  };

  render() {
    return (
      <div>
        <div className="container hello">
          <div className="row py-5 mt-4 align-items-center">
            <div className="col-md-5 pr-lg-5 mb-0 mb-md-0">
              <Image
                src={"http://localhost:3000/images/" + this.state.profile}
                roundedCircle
                id="profile"
              />
              <label class="filebutton mt-2">
                Edit Picture
                <span>
                  <input
                    type="file"
                    name="profile"
                    onChange={this.fileHandler}
                    className="font-weight-bold"
                  />
                </span>
              </label>
            </div>

            <div className="col-md-7 col-lg-6 ml-auto">
              <form>
                <div className="row">
                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-user text-muted"></i>
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
                  </div>

                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-user text-muted"></i>
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
                  </div>

                  <div className="input-group col-lg-12 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-envelope text-muted"></i>
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
                  </div>

                  <div className="input-group col-lg-12 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-phone-square text-muted"></i>
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
                      type="tel"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.changeHandler}
                      placeholder="Phone Number"
                      className="form-control bg-white border-md border-left-0 pl-3"
                    />
                  </div>

                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-lock text-muted"></i>
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
                  </div>

                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-lock text-muted"></i>
                      </span>
                    </div>
                    <input
                      id="passwordConfirmation"
                      value={this.state.password}
                      onChange={this.changeHandler}
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Confirm Password"
                      className="form-control bg-white border-left-0 border-md"
                    />
                  </div>

                  <div className="form-group col-lg-12 mx-auto mt-4">
                    <a
                      onClick={this.updateUser}
                      className="btn btn-primary btn-block py-2"
                    >
                      <span className="font-weight-bold">Update Data</span>
                    </a>
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

export default Updateuser;
