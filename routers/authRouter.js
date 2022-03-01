const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/users', authController.getAllUser);
router.get('/users/:userId', authController.getUserById)
router.post('/users', authController.registerUser);
router.post('/login', authController.postLogin);

module.exports = router;