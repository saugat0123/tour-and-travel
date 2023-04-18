const mongoose = require('mongoose')
const Travel = mongoose.model('Travel', {
    uid: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        }
    ],
    title: {
        type: String
    },
    des: {
        type: String
    }

})

module.exports = Travel