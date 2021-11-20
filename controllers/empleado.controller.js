'use strict';

const empleadoModel = require('../models/empleado.model');

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function getAllEmpleados(request, response, next) {
  try {
    const getQuery = await empleadoModel.getAllEmpleados();

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
async function addEmpleado(request, response, next) {
  const { nombre, turno } = request.body;

  if (!nombre || isNaN(turno)) {
    return response.status(422).json({
      message: 'Empty fields',
    });
  }

  try {
    const addQuery = await empleadoModel.addEmpleado({
      nombre,
      turno,
    });

    return response.status(200).json({
      message: 'Row added',
      idempleado: addQuery.rows[0]?.idempleado,
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
async function updateEmpleado(request, response, next) {
  const { idempleado } = request.params;
  const { nombre, turno } = request.body;

  if (!nombre || isNaN(turno)) {
    return response.status(422).json({
      message: 'Empty fields',
    });
  }

  try {
    const updateQuery = await empleadoModel.updateEmpleado({
      idempleado,
      nombre,
      turno,
    });

    if (updateQuery.rowCount == 0) {
      return response.status(404).json({
        message: 'Row not found',
        idempleado,
      });
    }

    return response.status(200).json({
      message: 'Row updated',
      idempleado,
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
async function deleteEmpleado(request, response, next) {
  const { idempleado } = request.params;

  try {
    const deleteQuery = await empleadoModel.deleteEmpleado(
      parseInt(idempleado)
    );

    if (deleteQuery.rowCount == 0) {
      return response.status(404).json({
        message: 'Row not found',
        idempleado,
      });
    }

    return response.status(200).json({
      message: 'Row deleted',
      idempleado,
    });
  } catch (error) {
    next({ error });
  }
}

module.exports = {
  getAllEmpleados,
  addEmpleado,
  updateEmpleado,
  deleteEmpleado,
};
