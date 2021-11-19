'use strict';

const router = require('express').Router();

const clienteController = require('../controllers/cliente.controller');

// POST
router.post('/', clienteController.addCliente);
// DELETE
router.delete('/:idcliente', clienteController.deleteCliente);

module.exports = router;
