const Task = require('../models/Task');

//@route POST api/task
//@desc creation of a task
//@access private
exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        Task: newTask,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      data: {
        message: err,
      },
    });
  }
};

//@route GET api/task
//@desc getting all task from the database
//@access private
exports.getAllTask = async (req, res) => {
  try {
    const Tasks = await Task.find();
    res.status(200).json({
      status: 'success',
      data: {
        Tasks: Tasks,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'faild',
      data: {
        message: err,
      },
    });
  }
};

//@route GET api/task || single task by using body parameter
//@desc getting single task from the database
//@access private
exports.getTask = async (req, res) => {
  try {
    const singleTask = await Task.findById(req.params.id);
    res.status(302).json({
      status: 'success',
      data: {
        Task: singleTask,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'faild',
      data: {
        message: err,
      },
    });
  }
};
//@route PATCH api/task
//@desc Update the data of the individual task into the database
//@access private
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'success',
      task: updatedTask,
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      data: {
        message: err,
      },
    });
  }
};

//@route DELETE api/task
//@desc Deleting the task from the DataBase
//@access private
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      data: {
        message: err,
      },
    });
  }
};
