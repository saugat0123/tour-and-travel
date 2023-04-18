const express = require("express");
const router = express.Router();
const Travel = require("../modules/travel");
const { check, validationResult } = require("express-validator");
const cryptjs = require("bcryptjs");
const path = require("path");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/upload");
const { verifyUser } = require("../middleware/auth");

router.post("/addtravel",verifyUser, function (req, res) {
  const uid = req.user._id
  const title = req.body.title
  const des = req.body.des

  const travelData = new Travel({
    uid:uid,
    title : req.body.tt,
    des : req.body.dd

  })
  travelData
  .save()
  .then(function (result) {
    console.log("travel result:::",result);
    res.status(200).json({ status: true, data: result });
  })
  .catch(function (errors) {
    res.status(5000).json({ message: errors });
  });

})

router.get('/travel/show', function (req, res) {

  console.log(req.user)
  Travel.find().then(function (result) {

      res.status(200).json({status: true, data: result})
      console.log("travel data show:::",result)
  })
  .catch(function (errors) {
    res.status(5000).json({ message: errors });
  });
})

module.exports = router;
