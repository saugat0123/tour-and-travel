const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotel = new Schema({
    name: {
        type: String,
        required: true,
    },

    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    rating: {
        type: Number,
    },
    images: {
        type: String,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Guide'
        }
    ],
});
const hotell = mongoose.model("Service", hotel);

module.exports = hotell
