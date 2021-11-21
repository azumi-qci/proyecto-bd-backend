'use strict';

const repartidorModel = require('../models/repartidor.model');

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function getAllRepartidores(request, response, next) {
  try {
    const getQuery = await repartidorModel.getAllRepartidores();

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
async function addRepartidor(request, response, next) {
  const { nombre, turno, idvehiculo } = request.body;

  if (!nombre || isNaN(turno) || !idvehiculo) {
    return response.status(422).json({
      message: 'Empty fields',
    });
  }

  try {
    const addQuery = await repartidorModel.addRepartidor({
      nombre,
      turno,
      idvehiculo,
    });

    return response.status(200).json({
      message: 'Row added',
      idrepartidor: addQuery.rows[0]?.idrepartidor,
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
async function updateRepartidor(request, response, next) {
  const { idrepartidor } = request.params;
  const { nombre, turno, idvehiculo } = request.body;

  if (!nombre || isNaN(turno) || !idvehiculo) {
    return response.status(422).json({
      message: 'Empty fields',
    });
  }

  try {
    const updateQuery = await repartidorModel.updateRepartidor({
      idrepartidor,
      nombre,
      turno,
      idvehiculo,
    });

    if (updateQuery.rowCount == 0) {
      return response.status(404).json({
        message: 'Row not found',
        idrepartidor,
      });
    }

    return response.status(200).json({
      message: 'Row updated',
      idrepartidor,
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
async function deleteRepartidor(request, response, next) {
  const { idrepartidor } = request.params;

  try {
    const deleteQuery = await repartidorModel.deleteRepartidor(
      parseInt(idrepartidor)
    );

    if (deleteQuery.rowCount == 0) {
      return response.status(404).json({
        message: 'Row not found',
        idrepartidor,
      });
    }

    return response.status(200).json({
      message: 'Row deleted',
      idrepartidor,
    });
  } catch (error) {
    next({ error });
  }
}

module.exports = {
  getAllRepartidores,
  addRepartidor,
  updateRepartidor,
  deleteRepartidor,
};
