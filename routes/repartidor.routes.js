'use strict';

const router = require('express').Router();

const repartidorController = require('../controllers/repartidor.controller');

// GET
router.get('/', repartidorController.getAllRepartidores);
// POST
router.post('/', repartidorController.addRepartidor);
// PUT
router.put('/:idrepartidor', repartidorController.updateRepartidor);
// DELETE
router.delete('/:idrepartidor', repartidorController.deleteRepartidor);

module.exports = router;
