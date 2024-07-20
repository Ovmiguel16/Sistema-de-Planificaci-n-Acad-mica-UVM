const express = require('express');
const router = express.Router();
const trimestresModel = require('../models/trimestres');

// Ruta para obtener todos los trimestres
router.get('/', (req, res) => {
  trimestresModel.getTrimestres((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Ruta para crear un nuevo trimestre
router.post('/', (req, res) => {
  trimestresModel.createTrimestre(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Trimestre creado exitosamente' });
  });
});

// Ruta para actualizar un trimestre
router.put('/:id', (req, res) => {
  const { id } = req.params;
  trimestresModel.updateTrimestre(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Trimestre actualizado exitosamente' });
  });
});

// Ruta para eliminar un trimestre
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  trimestresModel.deleteTrimestre(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Trimestre eliminado exitosamente' });
  });
});

module.exports = router;
