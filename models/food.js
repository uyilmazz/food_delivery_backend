const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    size: [
        {
            type: String
        }
    ],
    imageUrl: {
        type: String,
        // required: true
    },
    cookingTime: {
        type: Number
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        // required: true
    }],
    restaurantID: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        // required: true
    }

}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;