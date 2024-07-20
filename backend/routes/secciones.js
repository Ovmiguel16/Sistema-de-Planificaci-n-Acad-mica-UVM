const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtener todas las secciones
router.get('/', (req, res) => {
  const query = `
    SELECT secciones.*, profesores.nombre AS profesor_nombre, profesores.apellido AS profesor_apellido
    FROM secciones
    LEFT JOIN profesores ON secciones.profesor_id = profesores.id
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Crear una nueva sección
router.post('/', (req, res) => {
  const newSection = req.body;
  connection.query('INSERT INTO secciones SET ?', newSection, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: results.insertId, ...newSection });
    }
  });
});

// Actualizar una sección
router.put('/:id', (req, res) => {
  const updatedSection = req.body;
  connection.query('UPDATE secciones SET ? WHERE id = ?', [updatedSection, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Eliminar una sección
router.delete('/:id', (req, res) => {
  connection.query('DELETE FROM secciones WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
