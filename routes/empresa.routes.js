'use strict';

const router = require('express').Router();

const empresaController = require('../controllers/empresa.controller');

// GET
router.get('/', empresaController.getAllEmpresas);
// POST
router.post('/', empresaController.addEmpresa);
// PUT
router.put('/:idempresa', empresaController.updateEmpresa);
// DELETE
router.delete('/:idempresa', empresaController.deleteEmpresa);

module.exports = router;
