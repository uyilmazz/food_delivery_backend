const router = require('express').Router();
const foodController = require('../controllers/foodController');

// FOOD
router.get('/foods', foodController.getAllFood);
router.post('/foods', foodController.postFood);
router.get('/foods/:id', foodController.getFood);

// CATEGORY

// TODO get foods by categories url will change
router.get('/categories/:categoryid', foodController.getFoodsByCategoryId);
router.get('/categories', foodController.getAllCategory);

// RESTAURANT
router.get('/restaurant/:restaurantid', foodController.getFoodsByRestaurantId);
router.get('/restaurants', foodController.getAllRestaurant);


//  CART
router.get('/cart', foodController.getCart);
router.get('/cart/:userId', foodController.getCartByUserId);
router.post('/cart', foodController.postCart);
router.post('/delete-cartItem', foodController.deleteCartItem);
router.get('/clear-cart', foodController.clearCart);


module.exports = router;