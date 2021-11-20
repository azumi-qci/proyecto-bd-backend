'use strict';

const { pool } = require('../database');

let empleadoModel = {};

empleadoModel.getAllEmpleados = () => {
  const query = `
    SELECT *
    FROM public.empleado
    ORDER BY empleado
  `;

  return pool.query(query, []);
};

empleadoModel.addEmpleado = (data) => {
  const query = `
    INSERT INTO
      public.empleado (nombre, turno)
    VALUES ($1, $2)
    RETURNING idempleado
  `;

  return pool.query(query, [data.nombre, data.turno]);
};

empleadoModel.updateEmpleado = (data) => {
  const query = `
    UPDATE public.empleado
    SET
      nombre = $1,
      turno = $2
    WHERE idempleado = $3
  `;

  return pool.query(query, [data.nombre, data.turno, data.idempleado]);
};

empleadoModel.deleteEmpleado = (idempleado) => {
  const query = `
    DELETE
    FROM public.empleado
    WHERE idempleado = $1
  `;

  return pool.query(query, [idempleado]);
};

module.exports = empleadoModel;
