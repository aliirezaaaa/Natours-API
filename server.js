const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// All errors that occure in our synchronous code but are not handled anywhere, are called Uncaught Exceptions.
// Here we handle Uncaught Exceptions.
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// handle all promise rejections, anywhere in the application that were not handled yet.
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting Down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
