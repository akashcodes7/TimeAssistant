const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

dotenv.config({ path: './config/config.env' });

//importing all reequired routes
const taskRoute = require('./routes/taskRoutes');
const homeRoute = require('./routes/homeRoutes');
const userRoute = require('./routes/userRoutes');

//App configuration or middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  console.log(process.env.NODE_ENV);
}

//REST api
app.use('/', homeRoute);
app.use('/api/task', taskRoute);
app.use('/api/user', userRoute);

//middleware for a wrong query / for sending the response to the user for searching a wrong route
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

//Global error handling
app.use(globalErrorHandler);

module.exports = app;
