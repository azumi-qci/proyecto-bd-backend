'use strict';

const api = require('express').Router();

const clienteRoutes = require('./cliente.routes');
const empleadoRoutes = require('./empleado.routes');
const paqueteRoutes = require('./paquete.routes');
const repartidorRoutes = require('./repartidor.routes');

api.use('/clientes', clienteRoutes);
api.use('/empleados', empleadoRoutes);
api.use('/paquetes', paqueteRoutes);
api.use('/repartidores', repartidorRoutes);

// Set base route
api.use('/', (request, response) => {
  response.status(200).json({
    message: 'The API is working properly!',
  });
});

module.exports = api;
