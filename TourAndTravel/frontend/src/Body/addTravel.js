import React, {
  Component,
  state,
  submitUser,
  changeHandler,
  inputHandler,
  componentDidMount,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class addTravel extends Component {
  state = {
    tt: "",
    dd: "",
    titleError: "",
    desError: "",
    config: {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
    uid: localStorage.getItem("uid"),
    data: [],
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate() {
    let titleError = "";
    let desError = "";

    if (!this.state.tt) {
      titleError = "cannot be blank";
    }

    if (!this.state.dd) {
      desError = "cannot be blank";
    }

    if (titleError || desError) {
      this.setState({ titleError, desError });
      return false;
    }

    return true;
  }

  submitUser = (e) => {
    e.preventDefault();

    const isValid = this.validate();

    if (isValid) {
      axios
        .post("http://localhost:3000/addtravel", this.state, this.state.config)
        .then((response) => {
          toast.success("New travel journal added");
          window.location.href = "/travel";
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/travel/show", this.state.config)
      .then((response) => {
        this.setState({
          data: response.data.data,
        });
        console.log("travel response data::::", response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <div>
        <ToastContainer />

        <div className="container">
          <div className="row mt-0 align-items-center">
            <div className="col-md-7 col-lg-6 ">
              <form>
                <div className="row">
                  <div className="input-group col-lg-6 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-text-width text-muted" />
                      </span>
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      name="tt"
                      value={this.state.tt}
                      placeholder="Title"
                      onChange={this.changeHandler}
                      className="form-control bg-white border-left-0 border-md"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.titleError}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="input-group col-lg-12 mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white px-4 border-md border-right-0">
                        <i className="fa fa-align-justify text-muted" />
                      </span>
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      name="dd"
                      value={this.state.dd}
                      placeholder="Description"
                      onChange={this.changeHandler}
                      className="form-control bg-white border-left-0 border-md"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.desError}
                    </div>
                  </div>
                </div>
                <div className="form-group col-lg-4  mb-0">
                  <a href="#" className="btn btn-primary btn-block py-2">
                    <button
                      className="btn btn-primary"
                      onClick={this.submitUser}
                    >
                      Add journal
                    </button>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <h1>My Travel Journals</h1>
        <div className="container">
          <div class="row">
            {this.state.data.map((item) => {
              return (
                <div class="col-lg-6 mt-4">
                  <div class="card h-100">
                    <div class="card-body">
                      <b>
                        {" "}
                        <h4 class="card-title">{item.title}</h4>{" "}
                      </b>
                      <p class="card-title">{item.des}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default addTravel;
