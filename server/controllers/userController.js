const User = require('../models/User');

//@route POST /api/user/
//@desc It will give the user interface of register form
//@access public
exports.getAllUser = async (req, res) => {
  const Users = await User.find();
  try {
    res.status(201).json({
      status: 'success',
      data: {
        Users,
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

//@route POST /api/user/:id
//@desc   shows the single user information
//@access public
exports.getUser = async (req, res) => {
  const singleTask = await User.findById(req.params.id);
  try {
    res.status(201).json({
      status: 'success',
      data: {
        Task: singleTask,
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

//@route POST /api/registerUser
//@desc Creation of a user into the database for the authentication puerposes
//@access public
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      status: 'success',
      data: {
        updatedUser,
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
