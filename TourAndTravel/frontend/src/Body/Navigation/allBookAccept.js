import axios from 'axios';
import React, { Component, state, acceptOrder, address ,deliverOrder} from 'react';
import Geocode from "react-geocode";
import { Redirect } from "react-router";
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'

export default class allOrder extends Component {


  state = {


    data: [],
    config: {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }
  }

  componentDidMount() {
    const type = localStorage.getItem('user')
    if(type==="Admin")
    {
      axios.get('http://localhost:3000/unApprovedBooking', this.state.config).then((response) => {
        this.setState({
          data: response.data.data
        })

 })
}
else if(type==="Employee"){
  axios.get('http://localhost:3000/unDeliveredConfirm', this.state.config).then((response) => {
    this.setState({
      data: response.data.data
    })
})

  }
}



  acceptOrder = (id) => {
    axios.put('http://localhost:3000/approveConfirm/' + id, this.state, this.state.config).then((response) => {
toast.success("Order Accepted")

    })

  }


  deliverOrder=(oid,lat,lng)=>{
    axios.put('http://localhost:3000/AcceptdeliveryConfirm/'+oid,this.state,this.state.config).then((response)=>{


toast("Lets Deliver")
window.location.reload()
window.location.href='/maps/'+lat+"/"+lng

    })



  }

  render() {

    const type = localStorage.getItem('user')

    return (
      <div>
<ToastContainer/>
        <>
          {

            this.state.data.map((data) => {

              return (

                <>

                  <div className="page-content container" style={{ border: "solid 1px", marginTop: "20px" }}>
                    <div className="page-header text-blue-d2">
                      <h1 className="page-title text-secondary-d1">
                        Invoice
        <small className="page-info">
                          <i className="fa fa-angle-double-right text-80" />
                          {data._id}
                        </small>
                      </h1>

                    </div>
                    <div className="container px-0">
                      <div className="row mt-4">
                        <div className="col-12 col-lg-10 offset-lg-1">
                          <div className="row">
                            <div className="col-12">
                              <div className="text-center text-150">
                                <i className="fa fa-user fa-2x text-success-m2 mr-1" />
                                <span className="text-default-d3">TripPlanner</span>
                              </div>
                            </div>
                          </div>
                          {/* .row */}
                          <hr className="row brc-default-l1 mx-n1 mb-4" />
                          <div className="row">
                            <div className="col-sm-6">
                              <div>
                                <span className="text-sm text-grey-m2 align-middle text-left">To:</span>
                                <span className="text-600 text-110 text-blue align-middle text-left">{data.UserId.FirstName + " " + data.UserId.Lastname}</span>
                              </div>
                              <div className="text-grey-m2">
                                <div className="my-1">

                                </div>
                                <div className="my-1">
                                  {data.address}
                                </div>
                                <div className="my-1"><i className="fa fa-phone fa-flip-horizontal text-secondary" /> <b className="text-600">{data.UserId.PhoneNumber}</b></div>
                              </div>
                            </div>
                            {/* /.col */}
                            <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                              <hr className="d-sm-none" />
                              <div className="text-grey-m2">
                                <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                  Invoice
                </div>
                                <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1" /> <span className="text-600 text-90">ID:</span> #111-222</div>
                                <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1" /> <span className="text-600 text-90">Issue Date:</span> {data.orderDate}</div>
                                <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1" /> <span className="text-600 text-90">Status:</span> <span className="badge badge-warning badge-pill px-25">{data.paymentResponse}</span></div>
                              </div>
                            </div>
                            {/* /.col */}
                          </div>
                          <div className="mt-4">
                            <div className="row text-600 text-white bgc-default-tp1 py-25">
                              <div className="d-none d-sm-block col-1">#</div>
                              <div className="col-9 col-sm-5">Description</div>
                              <div className="d-none d-sm-block col-4 col-sm-2">Room Nos.</div>
                              <div className="d-none d-sm-block col-sm-2">Unit Price</div>
                              <div className="col-2">Amount</div>
                            </div>
                            <div className="text-95 text-secondary-d3">


                              {

                                data.ProductId.map((item, i) => {
                                  return (
                                    <>
                                      <div className="row mb-2 mb-sm-0 py-25">
                                        <div className="d-none d-sm-block col-1">{i}</div>
                                        <div className="col-9 col-sm-5">{item.item.Name}</div>
                                        <div className="d-none d-sm-block col-2">{item.qty}</div>
                                        <div className="d-none d-sm-block col-2 text-95">${item.item.Price}</div>
                                        <div className="col-2 text-secondary-d2">{item.item.Price * item.qty}</div>
                                      </div>

                                    </>
                                  )

                                })
                              }




                            </div>
                            <div className="row border-b-2 brc-default-l2" />

                            <div className="row mt-3">
                              <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">

                              </div>

                              <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">

                                <div className="row my-2">
                                  <div className="col-7 text-right">
                                    SubTotal
                  </div>
                                  <div className="col-5">
                                    <span className="text-120 text-secondary-d1">${data.totalAmount}</span>
                                  </div>
                                </div>
                                <div className="row my-2">
                                  <div className="col-7 text-right">
                                    Tax (10%)
                  </div>
                                  <div className="col-5">
                                    <span className="text-110 text-secondary-d1">$25</span>
                                  </div>
                                </div>
                                <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                  <div className="col-7 text-right">
                                    Total Amount
                  </div>
                                  <div className="col-5">
                                    <span className="text-150 text-success-d3 opacity-2">${data.totalAmount + 25}</span>
                                  </div>
                                </div>
                              </div>


                            </div>

                            <hr />
                            <div>
                              <span className="text-secondary-d1 text-105">Thank you for your business</span>


                              {type==="Admin"?
                              (<>
                               <button className="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0" onClick={this.acceptOrder.bind(this, data._id)}>Accept Order</button>

                              </>)
                              :(<>
                               <button className="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0 btn-danger" onClick={this.deliverOrder.bind(this, data._id,data.lat,data.lng)}>Deliver Order</button>

                              </>)


                              }
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </>


              )

            })
          }



        </>



      </div>
    );
  }
}
