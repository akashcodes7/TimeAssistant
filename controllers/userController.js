const User = require('../models/User');

//@route POST /api/register
//@desc It will give the user interface of register form
//@access public
exports.getRegister = (req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      message: 'Your are on user interface of registerUser form',
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
exports.registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newUser,
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
