import {React, Component, state, logout, toEdit} from "react";
import {NavLink, Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import cart from '../../img/icon/flight.png'
import book from '../../img/icon/book.png'
import service from '../../img/icon/settings.png'

class Navbar extends Component {

    state = {
        success: true,
        data: [],
        count: 0,
        config: {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        },
        total: 0,

        bsuccess: true,
        bdata: [],
        bcount: 0,
        btotal: 0


    }

    logout = () => {
        localStorage.clear()
        window.location.href = '/login'

    }

    componentDidMount() {

        axios.get('http://localhost:3000/booking/show', this.state.config).then((response) => {

            this.setState({

                success: response.data.success,
                data: response.data.data,
                count: response.data.count,
                total: response.data.Qty

            })
            console.log(response)

        })

        axios.get('http://localhost:3000/bookingHotel', this.state.config).then((response) => {

            this.setState({

                bsuccess: response.data.success,
                bdata: response.data.data,
                bcount: response.data.count,
                btotal: response.data.Qty

            })
            console.log(response)

        })


    }


    toEdit = () => {
        window.location.href = '/update'

    }

    toBookmark(){
        window.location.href = '/bookmarks'
    }

    render() {

        const token = localStorage.getItem('token')
        const type = localStorage.getItem('user')

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark ">

                    <NavLink className="navbar-brand" to="/">
                        <img src='http://localhost:3000/images/logo.svg' height="40" width="150"
                             style={{marginLeft: "100px"}}/>
                    </NavLink>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mr-auto" id="navbarNav">
                        <ul className="navbar-nav mr-auto">

                        </ul>


                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/viewResturant">
                                    Flights
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/viewHotel">
                                    Hotels
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/viewService">
                                    Services
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/currencyConvert">
                                    Convert Currency
                                </NavLink>
                            </li>


                            {!token ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">
                                                Login
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/register">
                                                Register
                                            </NavLink>
                                        </li>
                                    </>)
                                : (<>

                                    {
                                        type == "Admin" ? (<>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/tab">
                                                    Admin Panel
                                                </NavLink>

                                            </li>
                                        </>) : (<>
                                            {

                                                type === "Employee" ? (<>
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="/allorder">
                                                            Deliver
                                                        </NavLink>


                                                    </li>
                                                    <li className="nav-item"><NavLink className="nav-link"
                                                                                      to="/showAllOrder">
                                                        Your Deleveries
                                                    </NavLink></li>
                                                </>) : (<>
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="/order">
                                                            My Flights
                                                        </NavLink>

                                                    </li>
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="/bookings">
                                                            My Bookings
                                                        </NavLink>

                                                    </li>
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="/travel">
                                                             Travel Tales
                                                        </NavLink>

                                                    </li>
                                                </>)
                                            }


                                        </>)


                                    }
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {localStorage.getItem("username")}
                                        </a>
                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <button class="dropdown-item" onClick={this.toEdit}>Profile</button>
                                            <button className="dropdown-item" onClick={this.toBookmark}>Bookmarks
                                            </button>   
                                            <button class="dropdown-item" onClick={this.logout}>Logout</button>
                                        </div>
                                    </li>
                                    <li className="nav-item">

                                        <div className="header__top__right__cart">
                                            <Link to="/cart"><img src={cart} alt=""/>
                                                <span className="cart__price">{this.state.count}</span></Link>
                                            {/*<div className="cart__price"><span>{"$" + this.state.total}</span></div>*/}
                                        </div>
                                    </li> &nbsp;&nbsp;&nbsp;
                                    <li className="nav-item">

                                        <div className="header__top__right__cart">
                                            <Link to="/book"><img src={book} alt=""/>
                                                <span className="cart__price"> {this.state.bcount}</span></Link>
                                            {/*<div className="cart__price"><span>{"$" + this.state.btotal}</span></div>*/}
                                        </div>
                                    </li> &nbsp;
                                    <li className="nav-item">

                                        <div className="header__top__right__cart">
                                            <Link to="/services"><img src={service} alt=""/>
                                                <span className="cart__price"> {this.state.bcount}</span></Link>
                                            {/*<div className="cart__price"><span>{"$" + this.state.btotal}</span></div>*/}
                                        </div>
                                    </li>

                                </>)
                            }


                        </ul>
                    </div>
                </nav>
            </div>
        )
    }

}


export default Navbar;

