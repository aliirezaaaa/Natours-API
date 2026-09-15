const Tour = require('../models/tourModel');

//Middleware to Check body data
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price!',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    reuestedAt: req.requestTime,
    status: 200,
    // results: tours.length,
    // data: { tours },
  });
};

exports.getTourById = (req, res) => {
  const { id } = req.params;
  // const tour = tours.find((el) => el.id === +id);

  res.status(200).json({
    status: 'success',
    // data: { tour },
  });
};

exports.createTour = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};
