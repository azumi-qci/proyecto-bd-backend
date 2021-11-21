'use strict';

const empresaModel = require('../models/empresa.model');

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function getAllEmpresas(request, response, next) {
  try {
    const getQuery = await empresaModel.getAllEmpresas();

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
async function addEmpresa(request, response, next) {
  const { nombre, nombreRepresentante, telefono, idvehiculo } = request.body;

  if (!nombre || !nombreRepresentante || !telefono || !idvehiculo) {
    return response.status(422).json({
      message: 'Empty fields',
    });
  }

  try {
    const addQuery = await empresaModel.addEmpresa({
      nombre,
      nombreRepresentante,
      telefono,
      idvehiculo,
    });

    return response.status(200).json({
      message: 'Row added',
      idempresa: addQuery.rows[0]?.idempresa,
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
async function updateEmpresa(request, response, next) {
  const { idempresa } = request.params;
  const { nombre, nombreRepresentante, telefono, idvehiculo } = request.body;

  if (!nombre || !nombreRepresentante || !telefono || !idvehiculo) {
    return response.status(422).json({
      message: 'Empty fields',
    });
  }

  try {
    const updateQuery = await empresaModel.updateEmpresa({
      idempresa,
      nombre,
      nombreRepresentante,
      telefono,
      idvehiculo,
    });

    if (updateQuery.rowCount == 0) {
      return response.status(404).json({
        message: 'Row not found',
        idempresa,
      });
    }

    return response.status(200).json({
      message: 'Row updated',
      idempresa,
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
async function deleteEmpresa(request, response, next) {
  const { idempresa } = request.params;

  try {
    const deleteQuery = await empresaModel.deleteEmpresa(parseInt(idempresa));

    if (deleteQuery.rowCount == 0) {
      return response.status(404).json({
        message: 'Row not found',
        idempresa,
      });
    }

    return response.status(200).json({
      message: 'Row deleted',
      idempresa,
    });
  } catch (error) {
    next({ error });
  }
}

module.exports = {
  getAllEmpresas,
  addEmpresa,
  updateEmpresa,
  deleteEmpresa,
};
