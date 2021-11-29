'use strict';

const paqueteModel = require('../models/paquete.model');

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function getAllPaquetes(request, response, next) {
  try {
    const getQuery = await paqueteModel.getAllPaquetes();

    return response.status(200).json([...getQuery.rows]);
  } catch (error) {
    next({ error });
  }
}

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function addPaquete(request, response, next) {
  const { nombreCliente, dirDestino, peso, esFragil, dimension, idrepartidor } =
    request.body;

  if (
    !nombreCliente ||
    !dirDestino ||
    isNaN(peso) ||
    isNaN(esFragil) ||
    !dimension ||
    isNaN(idrepartidor)
  ) {
    return response.status(422).json({
      message: 'Empty fields',
    });
  }

  try {
    const addQuery = await paqueteModel.addPaquete({
      nombreCliente,
      dirDestino,
      peso,
      esFragil,
      dimension,
      idrepartidor,
    });

    return response.status(200).json({
      message: 'Row added',
      idpaquete: addQuery.rows[0]?.idpaquete,
      price: addQuery.rows[0]?.price,
    });
  } catch (error) {
    next({ error });
  }
}

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function updatePaquete(request, response, next) {
  const { idpaquete } = request.params;
  const { nombreCliente, dirDestino, peso, esFragil, dimension, idrepartidor } =
    request.body;

  if (
    !nombreCliente ||
    !dirDestino ||
    isNaN(peso) ||
    isNaN(esFragil) ||
    !dimension ||
    isNaN(idrepartidor)
  ) {
    return response.status(422).json({
      message: 'Empty fields',
    });
  }

  try {
    const updateQuery = await paqueteModel.updatePaquete({
      idpaquete,
      nombreCliente,
      dirDestino,
      peso,
      esFragil,
      dimension,
      idrepartidor,
    });

    if (updateQuery.rowCount == 0) {
      return response.status(404).json({
        message: 'Row not found',
        idpaquete,
      });
    }

    return response.status(200).json({
      message: 'Row updated',
      idpaquete,
    });
  } catch (error) {
    next({ error });
  }
}

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function deletePaquete(request, response, next) {
  const { idpaquete } = request.params;

  try {
    const deleteQuery = await paqueteModel.deletePaquete(parseInt(idpaquete));

    if (deleteQuery.rowCount == 0) {
      return response.status(404).json({
        message: 'Row not found',
        idpaquete,
      });
    }

    return response.status(200).json({
      message: 'Row deleted',
      idpaquete,
    });
  } catch (error) {
    next({ error });
  }
}

module.exports = {
  getAllPaquetes,
  addPaquete,
  updatePaquete,
  deletePaquete,
};
