'use strict';

const { pool } = require('../database');

let clienteModel = {};

clienteModel.getAllClientes = () => {
  const query = `
    SELECT *
    FROM public.cliente
    ORDER BY idcliente
  `;

  return pool.query(query, []);
};

clienteModel.addCliente = (data) => {
  const query = `
    INSERT INTO
      public.cliente (nombre, direccion, telefono, genero, fecha_nacimiento, curp)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING idcliente
  `;

  return pool.query(query, [
    data.nombre,
    data.direccion,
    data.telefono,
    data.genero,
    data.fechaNacimiento,
    data.curp,
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
