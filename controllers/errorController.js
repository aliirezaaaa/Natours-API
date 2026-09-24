// global error handling middleware.
// whenever we have 4 parameters, express automaticaly knows it is for error handling middleware.
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
