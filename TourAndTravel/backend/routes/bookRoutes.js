const {json} = require('express')
const express = require('express')
const {verifyUser} = require('../middleware/auth')
const router = express.Router()
const Cart = require('../modules/Book')
const Item = require('../modules/Room')

const date = new Date().toLocaleDateString("en-IN").split("/").toString()

router.post('/bookingHotel/:pid', verifyUser, function (req, res) {
    const uid = req.user._id
    const pid = req.params.pid
    const qtys = req.body.Qty
    const map = [];
    let obj;
    let book
    obj = {item: pid, qty: qtys}
    map.push(obj)

    Cart.findOne({UserId: uid}).then(function (book) {


        if (!book) {

            const booking = new Cart({UserId: uid, ProductId: [obj]})
            booking.save().then(function (result) {

                res.status(200).json({success: true, booking: true, data: booking})

            }).catch(function (error) {
                res.status(500).json({success: false})

            })
        } else {
            let newBooking = [];
            newBooking = book.ProductId
            console.log("newBooking::::::", newBooking)
            let index = 0;
            let data = 0;
            let milyo;

            for (data = 0; data < newBooking.length; data++) {

                if (newBooking[data].item.toString() === pid) {
                    milyo = true
                    index = data

                    break;
                }


            }
            if (milyo === true) {

                newBooking[index].qty += qtys
            } else {

                newBooking.push(obj)
            }

            Cart.findOneAndReplace({UserId: uid}, {
                UserId: uid,
                ProductId: newBooking
            }).then(function (s) {
                return res.status(200).json({success: true, booking: true, data: newBooking})
            })
        }
    })
})


//productId is an object of Food wit quantity

router.get('/bookingHotel', verifyUser, function (req, res) {

    var user = req.user._id
    // console.log('User IDD::::::',user)

    Cart.findOne({UserId: user}).populate('UserId').populate({path: 'ProductId.item'}).then(function (result) {

        let total = 0

        if (result === null) {

            res.status(200).json({status: true, data: null, count: 0, Qty: 0})


        } else {

            result.ProductId.map((item) => {

                let qty = item.qty
                let price = item.item.Price;
                total += price * qty
            })
            // console.log("total::::::::",total)
            // console.log("quantity::::::::",qty)
            res.status(200).json({
                status: true,
                data: result,
                count: result.ProductId.length,
                Qty: total,
                id: req.user._id
            })
            console.log("bookResult::::", result)

        }


    }).catch(function (err) {

        res.status(500).json({success: false, error: err})
        console.log(err)
    })


})

router.put('/delete/bookingHotel/:oid', verifyUser, function (req, res) {
    const id = req.user._id
    console.log("Hanyo")
    Cart.findOneAndUpdate({UserId: id}, {
        $pull: {ProductId: {_id: req.params.oid}},

    }).then(function (s) {

        res.status(200).json({success: true, data: s})
    }).catch((error) => {
        console.log(error)
    })
})


router.put('/updatebookingHotel/:pid', verifyUser, function (req, res, next) {
    const qty = req.body.Qty
    console.log(qty)
    const uid = req.user._id
    const pid = req.params.pid

    let book;
    Cart.findOne({UserId: uid})
        .populate("ProductId.item")
        .then((booking) => {
            book = booking;
            return Item.findById(pid);
        })
        .then((food) => {
            return book.editCart(food, qty);
        })
        .then((result) => {
            res.status(200).json(result.ProductId);
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });


// let booking =[]
// let index
// Booking.findOne({UserId:uid}).then(function(result){

// booking =result
// index = booking.ProductId.findIndex(pid)
// console.log(index)

// })


});

router.put('/deleteBookingHotel', verifyUser, function (req, res) {


    Cart.updateOne({UserId: req.user._id},
        {$pullAll: {ProductId: [0], Qty: [3]}}).then(function (s) {

        res.status(200).json({message: "Deleted"})
    })


})
router.delete('/deleteBooking', verifyUser, function (req, res) {

    Cart.findOneAndDelete({UserId: req.user._id}).then(function (result) {

        res, status(200).json({message: "Booking Deleted"})

    })
})


module.exports = router;
