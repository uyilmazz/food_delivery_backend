const { default: mongoose } = require('mongoose');
const Food = require('../models/food');
const Category = require('../models/category');
const User = require('../models/user');


const getAllFood = async (req, res, next) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.json({
            message: error
        });
    }
}

const getFood = async (req, res, next) => {
    try {
        const food = await Food.findById(req.params.id);
        res.json(food);
    } catch (error) {
        res.json({
            message: error
        });
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
        res.json({
            message: error
        });
    }
}

const getFoodsByCategoryId = async (req, res, next) => {
    const categoryId = req.params.categoryid;
    try {
        const foods = await Food.find({ categories: { $in: mongoose.Types.ObjectId(categoryId) } });
        console.log(categoryId);
        res.json(foods);
    } catch (error) {
        res.json({
            message: error
        });
    }

}

const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.json({
            message: error
        })
    }
}

const getFoodsByRestaurantId = async (req, res, next) => {
    const restaurantid = req.params.restaurantid;
    try {
        const foods = await Food.find({ restaurantID: restaurantid });
        res.json(foods);
    } catch (error) {
        res.json({
            message: error
        })
    }
}

const getCart = async (req, res, next) => {
    try {
        const _user = await User.findById(req.session.userID);
        const _cart = await _user.getCart();
        res.json(_cart);

    } catch (error) {
        res.json({
            message: error
        })
    }
}

const postCart = async (req, res, next) => {
    try {
        const _user = await User.findById(req.session.userID);
        const _food = await Food.findById(req.body.foodId);
        await _user.addToCart(_food);
        res.json(_user.cart.cartItems);
    } catch (error) {
        res.json({
            message: error
        })
    }
}

const deleteCartItem = async (req, res, next) => {
    const _foodId = req.body.foodId;
    try {
        const _user = await User.findById(req.session.userID);
        await _user.deleteCartItem(_foodId);
        console.log(_foodId);
        res.redirect('/cart');
    } catch (error) {
        res.json({
            message: error
        })
    }
}

const clearCart = async (req, res, next) => {
    try {
        const _user = await User.findById(req.session.userID);
        await _user.clearCart();
        res.redirect('/cart');
    } catch (error) {
        res.json({
            message: error
        });
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
    deleteCartItem,
    clearCart
}