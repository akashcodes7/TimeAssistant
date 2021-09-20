const express = require('express');

const router = express.Router();

//importing controller
const pageController = require('../controllers/pageController');

router.route('/').get(pageController.homePage);

module.exports = router;
