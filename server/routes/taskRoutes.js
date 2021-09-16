const express = require('express');

const router = express.Router();

//importing controller
const taskController = require('../controllers/taskController');

router
  .route('/')
  .get(taskController.getAllTask)
  .post(taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);
module.exports = router;
