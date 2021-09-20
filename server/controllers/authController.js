const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const AppError = require('../utils/appError');

//@route POST /api/User/signup
//@desc Register a user
//@access public
exports.signup = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({
          email: 'Email already exists',
        });
      }
      //access api of gravatar for random avatar if user has not their any img on their profile picture
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', //Rating
        d: 'mm', // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
      });

      //salting the password of the user and store into the database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw err;
          newUser.password = hash;
          // eslint-disable-next-line no-shadow
          newUser.save().then((user) => res.json(user));
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'User not created',
    });
  }
};

//@route POST /api/User/login
//@desc Login user / Returning JWT Token
//@access public
exports.login = (req, res) => {
  const { email, password } = req.body;

  //find the user by the email
  User.findOne({ email: email }).then((user) => {
    //check the user / user email
    if (!user) {
      res.status(404).json({ email: 'User not found' });
    }
    //check the password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //jwt authentication
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(201).json({
          status: 'success',
          token,
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
    });
  });
};

//@route middleware
//@desc for protecting the routes by the help of jwt
//@access developer/ide
exports.protect = async (req, res, next) => {
  //Getting token and check if's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split('Bearer ')[1];
  }
  if (!token) {
    return res.status(404).json({
      status: 'You are not logged in! Please login to access the resources',
    });
  }
  //Validate token / verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check if user still exists
  const existUser = await User.findById(decoded.id);
  if (!existUser) {
    return next(
      new AppError(
        'The user belonging to this Token does no longer exist.',
        401
      )
    );
  }

  //Check if user changed password after the token was issued

  next();
};
