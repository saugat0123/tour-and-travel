import { CallRounded } from "@material-ui/icons";
import axios from "axios";
import React, {
  Component,
  state,
  deleteBooking,
  updateBooking,
  order,
  changeHandler,
  plus,
  minus,
} from "react";
import { Link } from "react-router-dom";

import { Redirect } from "react-router";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import { Toast } from "bootstrap";

class Bookmark extends Component {
  state = {
    success: false,
    data: [],
    Name: "",
    Price: 0,
    Image: "",
    Description: "",
    count: 0,
    Qty: 0,
    total: 0,
    config: {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/getBookmark", this.state.config)
      .then((response) => {
        if (response.data.data === null || response.data.data.length === 0) {
          alert("Bookmarks is empty");
          window.location.href = "/";
        } else {
          console.log("Bookmarks items:::::", response.data);
          this.setState({
            success: response.data.success,
            data: response.data.data.ProductId,
            count: response.data.count,
            total: response.data.total,
          });
          console.log("data:::", this.state.data);
        }
      });
  }

  deleteBookmark(bid) {
    axios
      .put(
        "http://localhost:3000/delete/bookmark/" + bid,
        this.state,
        this.state.config
      )
      .then((response) => {
        toast.success("Bookmark Deleted!");
        window.location.href = "/bookmarks";
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <div className="container main-section">
          <div className="row">
            <div className="col-lg-12 pb-2">
              <h4>My bookmarks</h4>
            </div>
            <div className="col-lg-12 pl-3 pt-3">
              <table className="table table-hover border bg-white">
                <thead>
                  <tr>
                    <th> Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="row">
                        <div className="col-lg-2 Product-img">
                          <img
                            src={
                              "http://localhost:3000/images/" +
                              this.state.data.Image
                            }
                            alt="..."
                            className="img-responsive"
                          />
                        </div>
                        <div className="col-lg-10">
                          <h4 className="nomargin">{this.state.data.Name}</h4>
                          <p>{this.state.data.Description}</p>
                        </div>
                      </div>
                    </td>

                    <td data-th="" className="actions" width="10%;">
                      <button
                        className="btn btn-danger btn-sm mt-4"
                        onClick={this.deleteBookmark.bind(
                          this,
                          this.state.data._id
                        )}
                      >
                        <i className="fa fa-trash-o" />
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    {/* <td><a href="#" className="btn btn-warning text-white"><i
                                        className="fa fa-angle-left"/> Continue Shopping</a></td>
                                    <td colSpan="2" className="hidden-xs"/> */}
                    {/*<td className="hidden-xs text-center" width="10%;"><strong>Total*/}
                    {/*    : {this.state.total}</strong></td>*/}
                    {/* <td>
                                        <button onClick={this.order} className="btn btn-success btn-block">Checkout <i
                                            className="fa fa-angle-right"/></button>
                                    </td> */}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bookmark;
