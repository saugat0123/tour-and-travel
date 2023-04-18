const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const Item = require('../modules/Guide')
const auth = require('../middleware/auth')
const Store = require('../modules/Service')
const {verifyUser, verifyAdmin} = require('../middleware/auth');


router.put('/guide/photo/:id', verifyUser, verifyAdmin, upload.single('file'), function (req, res) {
    const id = req.params.id
    const file = req.file
    Item.findById({_id: id}).then(function (rs) {
        console.log(file)
        Item.findByIdAndUpdate({_id: id}, {
            Image: file.filename
        }).then(function (result) {

            res.status(200).json({success: true, message: "Updated", item: rs})
            console.log("ad")
        })
    })

})


router.get('/guide/show', function (req, res) {

    console.log(req.user)
    Item.find().then(function (result) {

        res.status(200).json({status: true, data: result})

    })


})


router.get('/searchGuide/:name', (req, res) => {

    Item.find({Name: {$regex: req.params.name, $options: '$i'}}).then((data) => {
        res.status(200).json({success: true, data: data})
    })

})

router.get('/guide/show/:id', function (req, res) {

    const id = req.params.id
    Item.findById({_id: id}).then(function (data) {
        res.status(200).json({status: true, data: data})
        console.log(data)
    })
})

router.post('/addGuide/:rid', upload.single('Image'), (req, res, next) => {
    console.log(req.file)
    console.log(req.body.Name)


    const name = req.body.Name
    const description = req.body.Description
    const rating = req.body.Rating
    const price = req.body.Price
    const image = req.file.filename
    let item
    let currentStore;
    const storeId = req.params.rid
    Store.findById(storeId)
        .then((store) => {
            console.log("Service details::::::", store)
            currentStore = store;
            item = new Item({
                Name: name, Description: description, Rating: rating, Price: price, Image: image
            });

            item.save().then((result) => {
                return res.status(200).json({success: true, item: item._id});
            })
            .catch((err) => {
                err.statusCode = 503;
                next(err);
            });
        })
        .then((good) => {
            currentStore.items.push(item._id);
            return currentStore.save();
        })
        .then((result) => {
            return res.status(200).json({success: true});
        })
        .catch((err) => {
            err.statusCode = 503;
            next(err);
        });
});


router.put('/updateGuide/:id', upload.single('Image'), function (req, res) {

    const name = req.body.Name
    const description = req.body.Description
    const rating = req.body.Rating
    const price = req.body.Price
    const image = req.file.filename


    Item.findByIdAndUpdate({_id: req.params.id}, {

        Name: name,
        Description: description,
        Rating: rating,
        Price: price,
        Image: image
    }).then(function (data) {
        res.status(200).json({success: true, message: "Update Item"})

    })


})


router.delete('/deleteGuide/:id/:rid', function (req, res) {
    const id = req.params.id
    const rid = req.params.id
    Item.findOneAndDelete({_id: req.params.id}).then(function (response) {
        Store.findOneAndUpdate({_id: rid}, {

            $pull: {items: {id}}

        }).then(function (re) {
            res.status(200).json({success: true, message: "One Item deleted"})
        })
    })


})

module.exports = router




