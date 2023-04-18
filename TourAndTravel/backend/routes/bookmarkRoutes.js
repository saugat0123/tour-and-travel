const {json} = require('express')
const express = require('express')
const {verifyUser} = require('../middleware/auth')
const router = express.Router()
const Bookmark = require('../modules/Bookmark')
const Room = require('../modules/Room')

const date = new Date().toLocaleDateString("en-IN").split("/").toString()

router.post('/bookmark/:pid', verifyUser, function (req, res) {
    const uid = req.user._id
    const pid = req.params.pid

    Bookmark.findOne({ProductId: pid})
        .then(function (bookmark) {
            if (!bookmark) {
                const bookMark = new Bookmark({UserId: uid, ProductId: pid})
                bookMark.save().then(function (result) {
                    res.status(200).json({success: true, booking: true, data: bookMark})
                }).catch(function (error) {
                    res.status(500).json({success: false, error: error})
                })
            } else {
                res.status(200).json({isBookmarked: true})
            }
        })
})


//productId is an object of Food wit quantity

router.get('/getBookmark', verifyUser, function (req, res) {

    var user = req.user._id
    // console.log('User IDD::::::',user)

    Bookmark.findOne({UserId: user}).populate('UserId').populate('ProductId').then(function (data) {

        let total = 0

        if (data === null) {

            res.status(200).json({status: true, data: null, count: 0, Qty: 0})


        } else {
            res.status(200).json({
                status: true,
                data: data,
                count: data.ProductId.length,
                id: req.user._id
            })
            console.log("bookmark::::", data)
        }


    }).catch(function (err) {

        res.status(500).json({success: false, error: err})
        console.log(err)
    })


})

router.put('/delete/bookmark/:oid', verifyUser, function (req, res) {
    Bookmark.findOneAndDelete({UserId: req.params.oid}).then(function (result) {

        res.status(200).json({message: "Bookmark Deleted"})

    })
})


router.put('/updatebookingHotel/:pid', verifyUser, function (req, res, next) {
    const qty = req.body.Qty
    console.log(qty)
    const uid = req.user._id
    const pid = req.params.pid

    let book;
    Bookmark.findOne({UserId: uid})
        .populate("ProductId.item")
        .then((booking) => {
            book = booking;
            return Room.findById(pid);
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


    Bookmark.updateOne({UserId: req.user._id},
        {$pullAll: {ProductId: [0], Qty: [3]}}).then(function (s) {

        res.status(200).json({message: "Deleted"})
    })


})
router.delete('/deleteBooking', verifyUser, function (req, res) {

    Bookmark.findOneAndDelete({UserId: req.user._id}).then(function (result) {

        res, status(200).json({message: "Bookmark Deleted"})

    })
})


module.exports = router;
