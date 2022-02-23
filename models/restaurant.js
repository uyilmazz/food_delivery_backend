const mongoose = require('mongoose');
const Schema = mongoose.Schema

const restaurantSchema = Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telNo: {
        type: String,
        required: true
    },
    delivery: {
        type: String
    },
    rating: {
        type: Number
    }

}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;