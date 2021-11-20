'use strict';

const router = require('express').Router();

const empleadoController = require('../controllers/empleado.controller');

// GET
router.get('/', empleadoController.getAllEmpleados);
// POST
router.post('/', empleadoController.addEmpleado);
// PUT
router.put('/:idempleado', empleadoController.updateEmpleado);
// DELETE
router.delete('/:idempleado', empleadoController.deleteEmpleado);

module.exports = router;
