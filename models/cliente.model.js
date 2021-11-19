'use strict';

const { pool } = require('../database');

let clienteModel = {};

clienteModel.addCliente = (data) => {
  const query = `
    INSERT INTO
      public.cliente (nombre, direccion, telefono, genero, fecha_nacimiento)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING idcliente
  `;

  return pool.query(query, [
    data.nombre,
    data.direccion,
    data.telefono,
    data.genero,
    data.fechaNacimiento,
  ]);
};

clienteModel.deleteCliente = (idcliente) => {
  const query = `
    DELETE
    FROM public.cliente
    WHERE idcliente = $1
  `;

  return pool.query(query, [idcliente]);
};

module.exports = clienteModel;
