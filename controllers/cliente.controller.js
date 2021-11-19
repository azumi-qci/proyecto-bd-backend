'use strict';

const clienteModel = require('../models/cliente.model');

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function getAllClientes(request, response, next) {
  try {
    const getQuery = await clienteModel.getAllClientes();

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
async function addCliente(request, response, next) {
  const { nombre, direccion, telefono, genero, fechaNacimiento, curp } =
    request.body;

  if (
    !nombre ||
    !direccion ||
    !telefono ||
    isNaN(genero) ||
    !fechaNacimiento ||
    !curp
  ) {
    return response.status(422).json({
      message: 'Empty fields',
    });
  }

  try {
    const addQuery = await clienteModel.addCliente({
      nombre,
      direccion,
      telefono,
      genero,
      fechaNacimiento,
      curp,
    });

    return response.status(200).json({
      message: 'Row added',
      idcliente: addQuery.rows[0]?.idcliente,
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
async function deleteCliente(request, response, next) {
  const { idcliente } = request.params;

  try {
    const deleteQuery = await clienteModel.deleteCliente(parseInt(idcliente));

    if (deleteQuery.rowCount == 0) {
      return response.status(404).json({
        message: 'Row not found',
        idcliente,
      });
    }

    return response.status(200).json({
      message: 'Row deleted',
      idcliente,
    });
  } catch (error) {
    next({ error });
  }
}

module.exports = { getAllClientes, addCliente, deleteCliente };
