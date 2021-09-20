const express = require('express');

const router = express.Router();

//importing controller
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const pageController = require('../controllers/pageController');

router
  .route('/signup')
  .get(pageController.signupPage)
  .post(authController.signup);

router.route('/login').get(pageController.loginPage).post(authController.login);

router.route('/').get(userController.getAllUser);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser);
module.exports = router;
