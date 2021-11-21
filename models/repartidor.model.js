'use strict';

const { pool } = require('../database');

let repartidorModel = {};

repartidorModel.getAllRepartidores = () => {
  const query = `
    SELECT *
    FROM public.repartidor
    ORDER BY idrepartidor
  `;

  return pool.query(query, []);
};

repartidorModel.addRepartidor = (data) => {
  const query = `
    INSERT INTO
      public.repartidor (nombre, turno, idvehiculo)
    VALUES ($1, $2, $3)
    RETURNING idrepartidor
  `;

  return pool.query(query, [data.nombre, data.turno, data.idvehiculo]);
};

repartidorModel.updateRepartidor = (data) => {
  const query = `
    UPDATE public.repartidor
    SET
      nombre = $1,
      turno = $2,
      idvehiculo = $3
    WHERE idrepartidor = $4
  `;

  return pool.query(query, [
    data.nombre,
    data.turno,
    data.idvehiculo,
    data.idrepartidor,
  ]);
};

repartidorModel.deleteRepartidor = (idrepartidor) => {
  const query = `
    DELETE
    FROM public.repartidor
    WHERE idrepartidor = $1
  `;

  return pool.query(query, [idrepartidor]);
};

module.exports = repartidorModel;
