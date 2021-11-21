'use strict';

const { pool } = require('../database');

let empresaModel = {};

empresaModel.getAllEmpresas = () => {
  const query = `
    SELECT *
    FROM public.empresa_externa
    ORDER BY idempresa
  `;

  return pool.query(query, []);
};

empresaModel.addEmpresa = (data) => {
  const query = `
    INSERT INTO
      public.empresa_externa (nombre, nombre_representante, telefono, idvehiculo)
    VALUES ($1, $2, $3, $4)
    RETURNING idempresa
  `;

  return pool.query(query, [
    data.nombre,
    data.nombreRepresentante,
    data.telefono,
    data.idvehiculo,
  ]);
};

empresaModel.updateEmpresa = (data) => {
  const query = `
    UPDATE public.empresa_externa
    SET
      nombre = $1,
      nombre_representante = $2,
      telefono = $3,
      idvehiculo = $4
    WHERE idempresa = $5
  `;

  return pool.query(query, [
    data.nombre,
    data.nombreRepresentante,
    data.telefono,
    data.idvehiculo,
    data.idempresa,
  ]);
};

empresaModel.deleteEmpresa = (idempresa) => {
  const query = `
    DELETE
    FROM public.empresa_externa
    WHERE idempresa = $1
  `;

  return pool.query(query, [idempresa]);
};

module.exports = empresaModel;
