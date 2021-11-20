'use strict';

const api = require('express').Router();

const clienteRoutes = require('./cliente.routes');
const empleadoRoutes = require('./empleado.routes');

api.use('/clientes', clienteRoutes);
api.use('/empleados', empleadoRoutes);

// Set base route
api.use('/', (request, response) => {
  response.status(200).json({
    message: 'The API is working properly!',
  });
});

module.exports = api;
