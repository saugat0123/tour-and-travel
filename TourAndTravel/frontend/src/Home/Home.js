import React, {
  Component,
  state,
  book,
  single,
  logout,
  post,
  getStars,
} from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
} from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import { data } from "jquery";

class Home extends Component {
  state = {
    item: [],
    config: {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
    search: "",
  };
  logout = () => {
    window.location.href = "/login";
  };

  getStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} color="red" />);
    }
    return stars;
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/food/show")
      .then((response) => {
        console.log("response:::::", response);
        this.setState({
          item: response.data.data,
        });
        console.log("response:::::", response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  single = (e) => {
    window.location.href = "/singleProduct/" + e;
  };

  book = (pid) => {
    toast(
      <div style={{ margin: "20px;" }}>
        <p className="text-center">
          <i className="fa fa-shopping-cart" /> Are you sure?
        </p>

        <button className="btn btn-dark" onClick={this.post.bind(this, pid)}>
          Yes
        </button>
        <button className="btn btn-danger">No</button>
      </div>,
      { position: "top-center" }
    );
  };
  post = (pid) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(
          "http://localhost:3000/booking/" + pid,
          this.state,
          this.state.config
        )
        .then((response) => {
          if (response.success === true) {
            toast(<Link to="/cart">Added to Cart</Link>);
          }
        });
      window.location.reload(false);
      console.log(pid);
    } else {
      toast.warning(
        <Link to="/login">
          <i className="fa fa-user" />
          Please Login To Shop
        </Link>
      );
    }
  };

  render() {
    const data = this.state.item;

    return (
      <div className="container-full">
        <ToastContainer autoClose={5000} />
        <div className="row-full">
          <MDBContainer>
            <MDBCarousel
              activeItem={1}
              length={3}
              showControls={true}
              showIndicators={true}
              className="z-depth-5 h-50"
              width="100%"
            >
              <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://www.teahub.io/photos/full/78-782296_trekking-wallpaper-4k.jpg"
                      alt="First slide"
                    />
                    <MDBMask overlay="black-light" />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h3 className="h3-responsive">
                      Your Dream Trip Now A Reality!!
                    </h3>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://aasarchitecture.com/wp-content/uploads/Cocoon-Hotel-and-Resort-by-dna-Barcelona-12.jpg"
                      alt="Second slide"
                    />
                    <MDBMask overlay="black-strong" />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h3 className="h3-responsive">Top Hotels</h3>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://cdn1.epicgames.com/ue/product/Screenshot/01-1920x1080-aedcdffc52c51dcba58d230ae383c3d1.jpg?resize=1&w=1600"
                      alt="Third slide"
                    />
                    <MDBMask overlay="black-slight" />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h3 className="h3-responsive">Best Flights</h3>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
              </MDBCarouselInner>
            </MDBCarousel>
          </MDBContainer>
        </div>
        <div className="wrapper">
          <div className="container">
            <div id="fda_app" className="row">
              <section id="fda_header_bar" className="col-12">
                <div className="row">
                  <div className="col-12">
                    <h1
                      style={{
                        color: "black",
                        fontFamily: "Brush Script MT",
                      }}
                    >
                      Book&nbsp;Best Flights
                    </h1>
                  </div>
                </div>
                <div className="row fda_search_row">
                  <div className="col-12">
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      options={this.state.item}
                      getOptionLabel={(option) => option.Name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search input"
                          margin="normal"
                          variant="outlined"
                          width="100px"
                          InputProps={{ ...params.InputProps, type: "search" }}
                        />
                      )}
                      renderOption={(option) => {
                        return (
                          <>
                            <div class="container">
                              <div className="row">
                                <div class="card-horizontal">
                                  <div class="img-square-wrapper">
                                    <img
                                      class=""
                                      src={
                                        "http://localhost:3000/images/" +
                                        option.Image
                                      }
                                      width="150"
                                      height="150"
                                      alt="Card image cap"
                                    />
                                  </div>
                                  <div class="card-body">
                                    <h4 class="card-title">{option.Name}</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </section>

              <div className="container">
                <div className="row">
                  {this.state.item.map((data, i) => {
                    return (
                      <div className="col-md-4 mb-3">
                        <div className="card h-100">
                          <div className="d-flex justify-content-between position-absolute w-100">
                            <div className="label-new">
                              <span className="text-white bg-success small d-flex align-items-center px-2 py-1">
                                <i className="fa fa-star" aria-hidden="true" />
                                <span className="ml-1" />
                              </span>
                            </div>
                            <div className="label-sale"></div>
                          </div>
                          <a href="#">
                            <img
                              src={"http://localhost:3000/images/" + data.Image}
                              onClick={this.single.bind(this, data._id)}
                              className="card-img-top"
                              alt="Product"
                            />
                          </a>
                          <div className="card-body px-2 pb-2 pt-1">
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="h4 text-primary">${data.Price}</p>
                              </div>
                              <div>
                                <a
                                  href="#"
                                  className="text-secondary lead"
                                  data-toggle="tooltip"
                                  data-placement="left"
                                  title="Compare"
                                >
                                  <i
                                    className="fa fa-line-chart"
                                    aria-hidden="true"
                                  />
                                </a>
                              </div>
                            </div>
                            <p className="text-warning d-flex align-items-center mb-2">
                              <a href="">{this.getStars(data.Rating)}</a>
                            </p>
                            <p className="mb-0">
                              <strong>
                                <a href="#" className="text-primary">
                                  {data.Name}
                                </a>
                              </strong>
                            </p>
                            <p className="mb-1">
                              <small></small>
                            </p>
                            <div className="d-flex mb-3 justify-content-between">
                              <div>
                                <p className="mt-2">{data.Description}</p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="col px-0">
                                <button
                                  className="btn btn-outline-primary btn-block"
                                  onClick={this.book.bind(this, data._id)}
                                >
                                  Book Flight&nbsp;
                                  <i
                                    className="fa fa-plus-circle"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="container">
                <hr />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              {this.state.item.slice(0, 4).map((item) => {
                return (
                  <div
                    className="col-md-3 col-sm-6"
                    style={{ marginBottom: "50px" }}
                  >
                    <div className="product-grid" style={{ height: "250px" }}>
                      <div
                        className="product-image"
                        style={{ height: "300px" }}
                      >
                        <a href="#" className="image">
                          <img
                            className="pic-1"
                            style={{ height: "200px", marginBottom: "100px" }}
                            src={"http://localhost:3000/images/" + item.Image}
                          />
                        </a>
                        <span className="product-sale-label">Sale</span>
                        <ul className="product-links">
                          <li>
                            <a href="#">
                              <i class="fa fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                class="fa fa-shopping-cart"
                                onClick={this.book.bind(this, item._id)}
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fa fa-random"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={this.single.bind(this, item._id)}
                            >
                              <i class="fa fa-eye"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="product-content">
                        <h3 className="title" style={{ marginBottom: "100px" }}>
                          <a href="#">{item.Name}</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
