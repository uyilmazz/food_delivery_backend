const User = require('../models/user');


exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({
            message: error
        });
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const _user = await User.findById(req.params.userId);
        res.json(_user);
    } catch (error) {
        res.json({
            message: error
        })
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
                    cartItems: req.body.cartItems
                }
            });

            await _user.save();
            res.json(_user);
        }
    } catch (error) {
        res.json({
            message: error
        });
    }
}

exports.postLogin = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    try {
        const _user = await User.findOne({ email, password });
        if (!_user) {
            res.status(401).json({
                message: `User doesn't exist!`
            })
        } else {
            req.session.userID = _user._id;
            res.status(200).json(_user);
        }

    } catch (error) {
        res.json({
            message: 'error' + error
        });
    }
}





