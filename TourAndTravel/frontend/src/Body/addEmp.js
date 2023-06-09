import React, {Component, state, changeHandler, fileHandler, addRoom} from 'react';
import axios from 'axios'

import {Redirect} from "react-router";
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'

class addEmp extends Component {
    state = {
        id: this.props.match.params.id,
        Name: '',
        Description: '',
        Rating: 0,
        Price: '',
        Image: '',
        time: '',


    }
    changeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fileHandler = (e) => {

        this.setState({
            Image: e.target.files[0],
            loaded: 0
        })
        console.log(e.target.files[0])


    }
    addRoom = () =>{

        const data = new FormData()
        data.append('Name', this.state.Name)
        data.append('Price', this.state.Price)
        data.append('Description', this.state.Description)
        data.append('Rating', this.state.Rating)
        data.append('Image', this.state.Image)

        axios.post('http://localhost:3000/addGuide/' + this.state.id, data).then((response) => {
            console.log(response)
            toast.success("Employer has been added")
            
        })
    }

    render() {
        return (


            <div>
                <ToastContainer/>


                <section class="get-in-touch">
                    <h1 class="title">Add Employer</h1>
                    <form class="contact-form row">
                        <div class="form-field col-lg-6">
                            <input id="text" name="Name" className="input-text js-input" value={this.state.Name}
                                   onChange={this.changeHandler} type="text"/>
                            <label className="label"> Name</label>
                        </div>
                        <div class="form-field col-lg-6 ">
                            <input id="text" name="Description" className="input-text js-input"
                                   value={this.state.Description} onChange={this.changeHandler} type="text" required/>
                            <label className="label">Job Description</label>
                        </div>
                        <div class="form-field col-lg-6 ">
                            <input id="company" className="input-text js-input" name="Price" value={this.state.Price}
                                   onChange={this.changeHandler} type="text" required/>
                            <label className="label">Price</label>
                        </div>
                        <div class="form-field col-lg-6 ">
                            <input id="phone" className="input-text js-input" name="Rating" value={this.state.Rating}
                                   onChange={this.changeHandler} type="number" required/>
                            <label className="label" for="phone">Rating</label>
                        </div>
                        <div class="form-field col-lg-6">
                            <input id="message" className="input-file js-input" name="Image" onChange={this.fileHandler}
                                   type="file" required/>
                            <label className="label" for="message">Image</label>
                        </div>
                        <div class="form-field col-lg-12">
                        </div>
                    </form>

                    <button className="submit-btn" type="submit" onClick={this.addRoom}>Submit</button>
                </section>
            </div>


        )
    }


}

export default addEmp;
