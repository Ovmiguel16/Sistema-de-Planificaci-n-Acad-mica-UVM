const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtener todas las materias
router.get('/', (req, res) => {
  const query = `
    SELECT materias.*, profesores.nombre AS profesor_nombre, profesores.apellido AS profesor_apellido
    FROM materias
    LEFT JOIN profesores ON materias.profesor_id = profesores.id
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

// Crear una nueva materia
router.post('/', (req, res) => {
  const newSubject = req.body;
  connection.query('INSERT INTO materias SET ?', newSubject, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: results.insertId, ...newSubject });
    }
  });
});

// Actualizar una materia
router.put('/:id', (req, res) => {
  const updatedSubject = req.body;
  connection.query('UPDATE materias SET ? WHERE id = ?', [updatedSubject, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Eliminar una materia
router.delete('/:id', (req, res) => {
  connection.query('DELETE FROM materias WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
