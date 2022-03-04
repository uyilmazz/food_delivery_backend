const { default: mongoose } = require('mongoose');
const Food = require('../models/food');
const Category = require('../models/category');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');


const getAllFood = async (req, res, next) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        console.log(error);
    }
}

const getFood = async (req, res, next) => {
    try {
        const food = await Food.findById(req.params.id);
        res.json(food);
    } catch (error) {
        console.log(error);
    }
}

const postFood = async (req, res, next) => {
    const food = new Food({
        name: req.body.name,
        price: req.body.price,
        description: req.body.name + 'description',
        size: ['S', 'M', 'L'],
        cookingTime: req.body.cookingTime
    });

    try {
        await food.save();
        res.json(food);
    } catch (error) {
        console.log(error);
    }
}

const getFoodsByCategoryId = async (req, res, next) => {
    const categoryId = req.params.categoryid;
    try {
        const foods = await Food.find({ categories: { $in: mongoose.Types.ObjectId(categoryId) } });
        res.json(foods);
    } catch (error) {
        console.log(error);
    }

}

const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.log(error);
    }
}

const getFoodsByRestaurantId = async (req, res, next) => {
    const restaurantid = req.params.restaurantid;
    try {
        const foods = await Food.find({ restaurantID: restaurantid });
        res.json(foods);
    } catch (error) {
        console.log(error);
    }
}

const getCart = async (req, res, next) => {
    try {
        const _user = await User.findById(req.body.userID);
        const _cart = await _user.getCart();
        res.json(_cart);

    } catch (error) {
        console.log(error);
    }
}

const getCartByUserId = async (req, res, next) => {
    try {
        const _user = await User.findById(req.params.userId);
        const _cartItems = await _user.getCart();
        res.json(_cartItems);
    } catch (error) {
        console.log(error);
    }
}

const postCart = async (req, res, next) => {
    try {
        const _user = await User.findById(req.body.userID);
        const _food = await Food.findById(req.body.foodId);
        await _user.addToCart(_food);
        res.status(200).send();
    } catch (error) {
        console.log(error);
    }
}

const decrementCartItem = async (req, res, next) => {
    const _foodId = req.body.foodId;
    try {
        const _user = await User.findById(req.body.userID);
        await _user.decrementCartItem(_foodId);
        res.json(_user.cart.cartItems);
    } catch (error) {
        console.log(error);
    }
}

const removeCartItem = async (req, res, next) => {
    const _foodId = req.body.foodId;
    try {
        const _user = await User.findById(req.body.userID);
        await _user.removeCartItem(_foodId);
        res.send();
    } catch (error) {
        console.log(error);
    }
}

const clearCart = async (req, res, next) => {
    try {
        const _user = await User.findById(req.body.userID);
        await _user.clearCart();
        res.send();
    } catch (error) {
        console.log(error);
    }

}

const getAllRestaurant = async (req, res, next) => {
    try {
        const _restaurants = await Restaurant.find();
        res.json(_restaurants);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllFood,
    getFood,
    postFood,
    getFoodsByCategoryId,
    getAllCategory,
    getFoodsByRestaurantId,
    postCart,
    getCart,
    decrementCartItem,
    clearCart,
    getAllRestaurant,
    getCartByUserId,
    removeCartItem
}