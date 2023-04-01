const express = require('express');
const cors = require('cors');

const appMiddleware = require('./middlewares/middleware'); // Middleware
const appRouter = require('./routes/router'); // Router
const errorHandler = require('./middlewares/errorHandler');
const cleanUp = require('./middlewares/cleanUp');

// Server
const app = express();

cleanUp; // cron job

// Middleware
appMiddleware(app);
app.options('*', cors());

// Router
appRouter(app);

// Error Handler
app.use(errorHandler);

module.exports = app;
