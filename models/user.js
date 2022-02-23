const mongoose = require('mongoose');
const Food = require('./food');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        cartItems: [
            {
                foodId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Food',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
}, { timestamps: true });


userSchema.methods.getCart = function () {
    const ids = this.cart.cartItems.map(food => {
        return food.foodId;
    });

    console.log(ids);
    return Food.find({
        _id: {
            $in: ids
        }
    }).then(foods => {
        return foods.map(food => {
            return {
                food,
                quantity: this.cart.cartItems.find(item => {
                    return item.foodId.toString() === food._id.toString();
                }).quantity
            }
        });
    })
        .catch(err => console.log(err));
}

userSchema.methods.addToCart = function (food) {

    const updatedCartItems = [...this.cart.cartItems]
    let itemQuantity = 1;

    const itemIndex = this.cart.cartItems.findIndex(uc => {
        return uc.foodId.toString() === food._id.toString();
    });

    if (itemIndex >= 0) {
        updatedCartItems[itemIndex].quantity += itemQuantity;
    } else {
        updatedCartItems.push({
            foodId: food._id,
            quantity: itemQuantity
        })
    }
    this.cart = {
        cartItems: updatedCartItems
    }
    return this.save();
}

userSchema.methods.deleteCartItem = function (foodId) {
    const cartItems = [...this.cart.cartItems];
    const _cartItems = cartItems.filter((food) => {
        return food.foodId.toString() !== foodId.toString();
    });

    return User.updateOne({ _id: this._id }, {
        cart: {
            cartItems: _cartItems
        }
    });
}

userSchema.methods.clearCart = function () {
    this.cart = { cartItems: [] };
    return this.save();
}

const User = mongoose.model('User', userSchema);

module.exports = User;