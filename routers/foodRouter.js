const router = require('express').Router();
const foodController = require('../controllers/foodController');

// FOOD
router.get('/foods', foodController.getAllFood);
router.post('/foods', foodController.postFood);
router.get('/foods/:id', foodController.getFood);

// CATEGORY
router.get('/categories/:categoryid', foodController.getFoodsByCategoryId);
router.get('/categories', foodController.getAllCategory);

// RESTAURANT
router.get('/restaurant/:restaurantid', foodController.getFoodsByRestaurantId);
router.get('/restaurants', foodController.getAllRestaurant);


//  CART
router.get('/cart', foodController.getCart);
router.get('/cart/:userId', foodController.getCartByUserId);
router.post('/cart', foodController.postCart);
router.post('/decrement-cartItem', foodController.decrementCartItem);
router.post('/remove-cartItem', foodController.removeCartItem);
router.post('/clear-cart', foodController.clearCart);


module.exports = router;