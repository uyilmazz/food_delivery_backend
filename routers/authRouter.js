const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/users', authController.getAllUser);
router.post('/users', authController.registerUser);
router.post('/login', authController.postLogin);

module.exports = router;