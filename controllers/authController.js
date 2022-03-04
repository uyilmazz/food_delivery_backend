const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.getUserById = async (req, res, next) => {
    try {
        const _user = await User.findById(req.params.userId);
        res.json(_user);
    } catch (error) {
        console.log(error);
    }
}

exports.registerUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.json({
                message: 'Email sistemde kayıtlı!'
            });
        } else {
            const _user = new User({
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                cart: {
                    cartItems: []
                }
            });

            const token = jwt.sign(_user.email, process.env.JWT_SECRET_KEY);
            _user.token = token;

            await _user.save();
            res.status(201).json(_user);
        }
    } catch (error) {
        console.log(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const _user = await User.findOne({ email, password });
        if (!_user) {
            res.status(201).send();
        } else {
            const token = jwt.sign(_user.email, process.env.JWT_SECRET_KEY);
            _user.token = token;
            res.status(200).json(_user);
        }
    } catch (error) {
        console.log('post Login error');
    }
}

exports.verifyToken = async (req, res, next) => {

    try {
        const token = req.body.token;
        console.log(token);
        if (!token) {
            res.status(201).send();
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const _user = await User.findOne({ email: decoded });
            if (_user) {
                res.status(200).json(_user);
            } else {
                res.status(201).send();
            }
        }

    } catch (error) {
        console.log(error);
    }



}





