const mongoose = require('mongoose');

const date = new Date()
const month = date.getMonth()
const year = date.getFullYear()
const day = date.getDate()

const bookmarkSchema = new mongoose.Schema({

    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    ProductId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        }
    ,
    Date: {
        type: String,
        default: `${year}/${month}/${day}`
    }

})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark
