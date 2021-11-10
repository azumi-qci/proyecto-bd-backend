'use strict';

const api = require('express').Router();

// Set base route
api.use('/', (request, response) => {
  response.json({
    message: 'The API is working properly!',
  });
});

module.exports = api;
