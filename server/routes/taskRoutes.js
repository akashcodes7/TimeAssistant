const express = require('express');

const router = express.Router();

//importing controller
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect, taskController.getAllTask)
  .post(authController.protect, taskController.createTask);

router
  .route('/:id')
  .get(authController.protect, taskController.getTask)
  .patch(authController.protect, taskController.updateTask)
  .delete(authController.protect, taskController.deleteTask);
module.exports = router;
