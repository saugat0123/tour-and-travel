import { React, Component, state, deleteProduct } from "react";

import { Container, Col, Row } from "react-bootstrap";
import Registration from "./Registration";
import { Route } from "react-router-dom";
import Login from "./Login";
import addResturant from "../Resturant/addResturant";
import addHotel from "../Hotel/addHotel";
import viewHotel from "../Hotel/VuHotel";
import addService from "../Service/addService";
import viewService from "../Service/VuService";
import viewResturant from "../Body/viewResturant";
import updateRes from "../Body/updateResturant";
import Cart from "./Cart";
import Book from "./Book";
import Service from "./Service";
import Tabs from "./TabPanel";

import admin from "./admin";
import checkOut from "./checkOut";
import checkOutBook from "./checkOutBook";
import Updateuser from "./Updateuser";
import Home from "../Home/Home";
import Order from "../Body/orderReciept";
import Bookings from "../Body/bookReciept";
import Bookmarks from "../Body/Bookmark";
import Update from "./Update";
import Map from "./Navigation/AMap";
import BMap from "./Navigation/BMap";

import ShowOrder from "./Navigation/showAllOrder";
import singleProduct from "./singleProduct";
import addFood from "./addFood";
import addRoom from "./addRoom";
import UpdateFood from "./Navigation/updateFood";
import UpdateRoom from "./Navigation/updateRoom";
import UpdateEmp from "./Navigation/updateEmp";
import viewUser from "./viewUser";
import viewRestFood from "./viewRestFood";
import viewRooms from "./viewRooms";
import AllOrder from "./Navigation/allOrderAccept";
import axios from "axios";
import Convert from "./Converter/Convert";
import addTravel from "./addTravel";
import addEmp from "./addEmp";
import viewEmp from "./viewEmp";

class Body extends Component {
  render() {
    return (
      <div className="container-fluid" id="appbody">
        <Row>
          <Col>
            <Route path="/map" component={Map} />
            <Route path="/maps/:lat/:lng" component={BMap} />
            <Route path="/currencyConvert" component={Convert} />

            {/*User Routes*/}
            <Route exact path="/" component={Home} />
            <Route exact path="/travel" component={addTravel} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/checkOut" component={checkOut} />
            <Route path="/checkOutBook" component={checkOutBook} />
            <Route exact path="/order" component={Order} />
            <Route exact path="/bookings" component={Bookings} />
            <Route exact path="/bookmarks" component={Bookmarks} />
            <Route path="/update/:id" component={Update} />
            <Route path="/cart" component={Cart} />
            <Route path="/book" component={Book} />
            <Route path="/services" component={Service} />
            <Route path="/update" component={Updateuser} />
            <Route path="/singleProduct/:id" component={singleProduct} />
            <Route path="/viewRestFood/:id" component={viewRestFood} />
            <Route path="/viewRooms/:id" component={viewRooms} />
            <Route path="/viewEmp/:id" component={viewEmp} />
            <Route path="/viewHotel" component={viewHotel} />

            {/*Admin Routes*/}
            <Route path="/tab" component={Tabs} />
            <Route path="/updateFood/:id" component={UpdateFood} />
            <Route path="/updateRoom/:id" component={UpdateRoom} />
            <Route path="/updateEmp/:id" component={UpdateEmp} />
            <Route path="/users" component={viewUser} />
            <Route path="/addFood/:id" component={addFood} />
            <Route path="/addRoom/:id" component={addRoom} />
            <Route path="/addEmp/:id" component={addEmp} />
            <Route path="/viewResturant" component={viewResturant} />
            <Route path="/addResturant" component={addResturant} />
            <Route path="/addHotel" component={addHotel} />
            <Route path="/addService" component={addService} />
            <Route path="/viewService" component={viewService} />
            <Route exact path="/showAllOrder" component={ShowOrder} />
            <Route path="/allorder" component={AllOrder} />
            <Route path="/admin" component={admin} />
            <Route path="/updateRes/:id" component={updateRes} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Body;
