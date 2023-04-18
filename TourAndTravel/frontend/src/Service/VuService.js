import React, {Component, state, book, single, logout, post, getStars} from 'react'
import axios from 'axios'
import {TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab'
import Carousel from 'react-bootstrap/Carousel'
import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer} from
        "mdbreact";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faStar, faTrash} from "@fortawesome/free-solid-svg-icons";

import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'

class VuService extends Component {


    state = {
        item: [],
        config: {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        },
        search: ''


    }
    logout = () => {

        window.location.href = '/login'

    }

    getStars = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} color="red"/>);
        }
        return stars;
    };

    componentDidMount() {
        axios.get("http://localhost:3000/guide/show")
            .then((response) => {
                console.log(response)
                this.setState({
                    item: response.data.data

                })

            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    single = (e) => {

        window.location.href = '/singleProduct/' + e
    }

    book = (pid) => {

        toast(<div style={{margin: "20px;"}}>
            <p className="text-center"><i className="fa fa-shopping-cart"/> Are You Suer to Hire?</p>

            <button className="btn btn-dark" onClick={this.post.bind(this, pid)}>Yes</button>
            <button className="btn btn-danger">No</button>
        </div>, {position: "top-center"})


    }
    post = (pid) => {

        const token = localStorage.getItem("token")
        if (token) {
            axios.post("http://localhost:3000/bookingHire/" + pid, this.state, this.state.config).then((response) => {

                if (response.success === true) {

                    toast(<Link to='/cart'>Added to Services</Link>)

                }

            })
            window.location.reload(false)
            console.log(pid)
        } else {
            toast.warning(<Link to='/login'><i className="fa fa-user"/>Please Login</Link>)

        }


    }

    bookmark (pid) {
        const token = localStorage.getItem("token")
        if (token) {
            axios.post("http://localhost:3000/bookmark/" + pid, this.state, this.state.config).then((response) => {

                if (response.success === true) {

                    toast(<Link to='/bookmarks'>Bookmark Added</Link>)
                }
            })
            // window.location.reload(false)
            console.log(pid)
        } else {
            toast.warning(<Link to='/login'><i className="fa fa-user"/>Please Login To Shop</Link>)

        }
    }


    render() {
        const data = this.state.item

        return (

            <div className="container-full">
                <ToastContainer autoClose={5000}/>

                <div className="wrapper">

                    <div className="container">

                        <div id="fda" className="row">


                            <section id="fda_header_bar" className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <h1 style={{
                                            "color": "black",
                                            "fontFamily": "Brush Script MT"
                                        }}>Hire&nbsp;Quality
                                            Service</h1>
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
                                                    InputProps={{...params.InputProps, type: 'search'}}
                                                />
                                            )}

                                            renderOption={(option) => {

                                                return (

                                                    <>

                                                        <div class="container">
                                                            <div className="row">
                                                                <div class="card-horizontal">
                                                                    <div class="img-square-wrapper">
                                                                        <img class=""
                                                                             src={"http://localhost:3000/images/" + option.Image}
                                                                             width="150" height="150"
                                                                             alt="Card image cap"/>
                                                                    </div>
                                                                    <div class="card-body">
                                                                        <h4 class="card-title">{option.Name}</h4>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </>


                                                )

                                            }}

                                        />


                                    </div>

                                </div>
                            </section>


                            <div className="container">
                                <div className="row">


                                    {
                                        this.state.item.map((data, i) => {

                                            return (

                                                <div className="col-md-4 mb-3">
                                                    <div className="card h-100">
                                                        <div
                                                            className="d-flex justify-content-between position-absolute w-100">
                                                            <div className="label-new">
                                                                <span
                                                                    className="text-white bg-success small d-flex align-items-center px-2 py-1">
                                                                  <i className="fa fa-star" aria-hidden="true"/>
                                                                  <span className="ml-1"/>
                                                                </span>
                                                            </div>
                                                            <div className="label-sale">
                                                                <span
                                                                    className="text-white bg-primary small d-flex align-items-center px-2 py-1">
                                                                  <i className="fa fa-tag" aria-hidden="true"/>
                                                                  <span className="ml-1">Sale</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <a href="#">
                                                            <img src={"http://localhost:3000/images/" + data.Image}
                                                                 onClick={this.single.bind(this, data._id)}
                                                                 className="card-img-top" alt="Product"/>
                                                        </a>
                                                        <div className="card-body px-2 pb-2 pt-1">
                                                            <div className="d-flex justify-content-between">
                                                                <div>
                                                                    <p className="h4 text-primary">${data.Price}</p>
                                                                </div>
                                                                {/* <div>
                                                                    <a href="#" className="text-secondary lead"
                                                                       data-toggle="tooltip" data-placement="left"
                                                                       title="Compare">
                                                                        <i className="fa fa-line-chart"
                                                                           aria-hidden="true"/>
                                                                    </a>
                                                                </div> */}
                                                            </div>
                                                            <p className="text-warning d-flex align-items-center mb-2">
                                                                <a href=''>{this.getStars(data.Rating)}</a>
                                                            </p>
                                                            <p className="mb-0">
                                                                <strong>
                                                                    <a href="#"
                                                                       className="text-primary">{data.Name}</a>
                                                                </strong>
                                                            </p>
                                                            <p className="mb-1">
                                                                <small>
                                                                <div className="col px-0">
                                                                    <h4>{data.Description}</h4>
                                                                </div>
                                                                </small>
                                                            </p>
                                                            
                                                            <div className="d-flex justify-content-between">
                                                                <div className="col px-0">
                                                                    <button
                                                                        className="btn btn-outline-primary btn-block"
                                                                        onClick={this.book.bind(this, data._id)}>
                                                                        Hire Now &nbsp;
                                                                        <i className="fa fa-check-circle "
                                                                           aria-hidden="true"/>
                                                                    </button>
                                                                </div>
                                                                
                                                                {/* <div className="ml-2">
                                                                    <button className="btn btn-outline-success"
                                                                       data-toggle="tooltip" data-placement="left"
                                                                       title="Add to Wishlist"
                                                                    onClick={this.bookmark.bind(this, data._id)}>
                                                                        <i className="fa fa-heart"
                                                                           aria-hidden="true"/>
                                                                    </button>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })

                                    }
                                </div>
                            </div>


                            <div className="container">
                                <hr/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default VuService
