'use strict';

const router = require('express').Router();

const paqueteController = require('../controllers/paquete.controller');

// GET
router.get('/', paqueteController.getAllPaquetes);
// POST
router.post('/', paqueteController.addPaquete);
// PUT
router.put('/:idpaquete', paqueteController.updatePaquete);
// DELETE
router.delete('/:idpaquete', paqueteController.deletePaquete);

module.exports = router;
