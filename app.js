const dotenv = require('dotenv');
const express = require('express');

const app = express();
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });

//importing all reequired routes
const taskRoute = require('./routes/taskRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  console.log(process.env.NODE_ENV);
}

app.use('/api/task', taskRoute);

module.exports = app;
