'use strict';

const router = require('express').Router();

const clienteController = require('../controllers/cliente.controller');

// GET
router.get('/', clienteController.getAllClientes);
// POST
router.post('/', clienteController.addCliente);
// PUT
router.put('/:idcliente', clienteController.updateCliente);
// DELETE
router.delete('/:idcliente', clienteController.deleteCliente);

module.exports = router;
