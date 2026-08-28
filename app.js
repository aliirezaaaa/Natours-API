const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const toureRouter = require('./routes/tourRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', toureRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
