const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

const getAllTours = (req, res) => {
  res.status(200).json({
    reuestedAt: req.requestTime,
    status: 200,
    results: tours.length,
    data: { tours },
  });
};

const getTourById = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === +id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid tour ID!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTourById);
app.post('/api/v1/tours', createTour);

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port${port}`);
});
