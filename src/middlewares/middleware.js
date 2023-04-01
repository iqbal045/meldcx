const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const limiter = require('./limiter');

const middleware = [
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
  express.static(`${process.env.FOLDER}`),
  morgan('dev'),
  limiter,
];

module.exports = app => {
  middleware.forEach(m => {
    app.use(m);
  });
};
