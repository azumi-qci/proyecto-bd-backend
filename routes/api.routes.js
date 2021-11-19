'use strict';

const api = require('express').Router();

const clienteRoutes = require('./cliente.routes');

api.use('/clientes', clienteRoutes);

// Set base route
api.use('/', (request, response) => {
  response.status(200).json({
    message: 'The API is working properly!',
  });
});

module.exports = api;
