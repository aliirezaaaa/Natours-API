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

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.status = 'fail';
  error.statusCode = 404;
  next(error);
});

//global error handling middleware.
//whenever we have 4 parameters, express automaticaly knows it is for error handling middleware.
app.use((err, req, res, next) => {
  err.stausCode = err.stausCode || 500;
  err.status = err.status || 'error';

  res.status(err.stausCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
