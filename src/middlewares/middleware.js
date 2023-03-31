const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const middleware = [
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
  morgan('dev'),
];

module.exports = app => {
  middleware.forEach(m => {
    app.use(m);
  });
};
