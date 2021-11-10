'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const apiRoutes = require('./routes/api.routes');

// Instantiate express server
const app = express();

// Configurate middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set base URL
app.use('/', apiRoutes);

// Set error handler
app.use((error, request, response, next) => {
  console.log(error);
  // Get error response
  sendResponse(response, 500, 'server_error', null, {
    date_time: new Date().toISOString(),
    ...error,
    throwed: {
      message: error.message ? error.message : null,
      name: error.name ? error.name : null,
      stack: error.stack ? error.stack : null,
    },
  });
});

module.exports = { app };
