const dotenv = require('dotenv');
const express = require('express');

const app = express();
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });

//importing all reequired routes
const taskRoute = require('./routes/taskRoutes');

//App configuration or middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  console.log(process.env.NODE_ENV);
}
//REST api
app.use('/api/task', taskRoute);

module.exports = app;
