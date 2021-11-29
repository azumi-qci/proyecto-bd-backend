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
      public.paquete (nombre_cliente, dir_destino, peso, es_fragil, dimension, idrepartidor)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING idpaquete, price
  `;

  return pool.query(query, [
    data.nombreCliente,
    data.dirDestino,
    data.peso,
    data.esFragil,
    data.dimension,
    data.idrepartidor,
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
      dimension = $5,
      idrepartidor = $6
    WHERE idpaquete = $7
  `;

  return pool.query(query, [
    data.nombreCliente,
    data.dirDestino,
    data.peso,
    data.esFragil,
    data.dimension,
    data.idrepartidor,
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
