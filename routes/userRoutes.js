const express = require('express');

const router = express.Router();

//importing controller
const userController = require('../controllers/userController');

router
  .route('/')
  .get(userController.getRegister)
  .post(userController.registerUser);

// router
//   .route('/:id')
//   .get(userController.getTask)
//   .patch(userController.updateTask)
//   .delete(userController.deleteTask);
module.exports = router;
