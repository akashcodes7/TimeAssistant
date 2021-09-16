const express = require('express');

const router = express.Router();

//importing controller
const homeController = require('../controllers/homeController');

router.route('/').get(homeController.home);

module.exports = router;
