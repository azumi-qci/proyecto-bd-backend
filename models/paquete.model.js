'use strict';

const { pool } = require('../database');

let paqueteModel = {};

paqueteModel.getAllPaquetes = () => {
  const query = `
    SELECT *
    FROM public.paquete
    ORDER BY idpaquete
  `;

  return pool.query(query, []);
};

paqueteModel.addPaquete = (data) => {
  const query = `
    INSERT INTO
      public.paquete (nombre_cliente, dir_destino, peso, es_fragil, dimension)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING idpaquete
  `;

  return pool.query(query, [
    data.nombreCliente,
    data.dirDestino,
    data.peso,
    data.esFragil,
    data.dimension,
  ]);
};

paqueteModel.updatePaquete = (data) => {
  const query = `
    UPDATE public.paquete
    SET
      nombre_cliente = $1,
      dir_destino = $2,
      peso = $3,
      es_fragil = $4,
      dimension = $5
    WHERE idpaquete = $6
  `;

  return pool.query(query, [
    data.nombreCliente,
    data.dirDestino,
    data.peso,
    data.esFragil,
    data.dimension,
    data.idpaquete,
  ]);
};

paqueteModel.deletePaquete = (idpaquete) => {
  const query = `
    DELETE
    FROM public.paquete
    WHERE idpaquete = $1
  `;

  return pool.query(query, [idpaquete]);
};

module.exports = paqueteModel;
