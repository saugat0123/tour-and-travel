import {Component, state, addFood, deleteRest, update, getStars} from "react";
import axios from 'axios'
import {Card, Button} from 'react-bootstrap'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faStar, faTrash} from "@fortawesome/free-solid-svg-icons";

export default class viewHotel extends Component {

    state = {
        data: []
    }

    componentDidMount() {

        axios.get('http://localhost:3000/getService').then((response) => {

            this.setState({data: response.data.data})
            console.log("service data::::.........", response.data)
        })
    }

    getStars = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} color="red"/>);
        }
        return stars;
    };

    viewRestFood(id) {

        window.location.href = '/viewEmp/' + id
    }

    addFood = (id) => {
        window.location.href = "/addEmp/" + id

    }
    update = (id) => {
        window.location.href = "/updateEmp/" + id

    }

    deleteRest = (id) => {
        axios.delete('http://localhost:3000/delService/' + id).then((response) => {

            alert("Service deleted")
            window.location.href = '/viewResturant'
        })

    }


    render() {
        const user = localStorage.getItem('user')

        return (
            <div>
                <div>

                    <h1 className="text-center">Our Services</h1>
                    {

                        this.state.data.map((data) => {
                            return (
                                <div className="row p-2 bg-white border rounded">
                                    <div className="col-md-3 mt-1"><img
                                        class="img-fluid img-responsive rounded product-image"
                                        src={"http://localhost:3000/images/" + data.images}
                                        style={{height: "250px", width: "350px"}}/></div>
                                    <div className="col-md-6 mt-1">
                                        <h5><strong>{data.name}</strong></h5>
                                        <div className="d-flex flex-row">
                                            <div className="ratings mr-2"><span>Overall Rating</span><br/>
                                                {this.getStars(data.rating)}</div>
                                        </div>
                                        <div className="mt-1 mb-1 spec-1"><br/>
                                            <div className="row ">
                                                {

                                                    data.items.slice(0, 5).map((item) => {
                                                        return (

                                                            <div className="col-lg-2">
                                                                <img src={"http://localhost:3000/images/" + item.Image}
                                                                     style={{
                                                                         height: "80px",
                                                                         width: "80px",
                                                                         borderRadius: "20%"
                                                                     }}/>
                                                            </div>

                                                        )
                                                    })
                                                }
                                            </div>


                                        </div>

                                        <p class="text-justify text-truncate para mb-0">{"You can contact us at our number +977" + data.phone + " " + "and"}
                                            <br/> {"Vist us at " + data.address} <br/></p>
                                    </div>
                                    <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                        
                                    
                                        <div class="d-flex flex-column mt-4">

                                            {user === "Admin" ? (<>
                                                <button class="btn btn-outline-primary btn-sm mt-2" type="button"
                                                        onClick={this.addFood.bind(this, data._id)}>Add Employer
                                                </button>
                                                {/* <button class="btn btn-outline-primary btn-sm mt-2" type="button">Update Details</button> */}
                                                <button class="btn btn-outline-primary btn-sm mt-2"
                                                        onClick={this.deleteRest.bind(this, data._id)}
                                                        type="button">Delete Service
                                                </button>
                                                {/* <button class="btn btn-outline-primary btn-sm mt-2"
                                                        onClick={this.update.bind(this, data._id)} type="button">Update
                                                    Service
                                                </button> */}

                                                <button class="btn btn-outline-primary btn-sm mt-2"
                                                        onClick={this.viewRestFood.bind(this, data._id)}
                                                        type="button">Details
                                                </button>
                                            </>) : (<>
                                                <button class="btn btn-outline-primary btn-sm mt-2"
                                                        onClick={this.viewRestFood.bind(this, data._id)}
                                                        type="button">View Employers
                                                </button>

                                            </>)


                                            }


                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        )
    }


}
