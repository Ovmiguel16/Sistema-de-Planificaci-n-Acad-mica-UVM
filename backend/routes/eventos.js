const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los eventos
router.get('/', (req, res) => {
  const query = `
    SELECT e.*, p.nombre AS profesor_nombre, p.apellido AS profesor_apellido, m.nombre AS materia_nombre, s.nombre AS seccion_nombre
    FROM eventos e
    LEFT JOIN profesores p ON e.profesor_id = p.id
    LEFT JOIN materias m ON e.materia_id = m.id
    LEFT JOIN secciones s ON e.seccion_id = s.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Crear un nuevo evento
router.post('/', (req, res) => {
  const { tipo, titulo, descripcion, fecha, hora, ubicacion, profesor_id, materia_id, seccion_id } = req.body;
  const query = 'INSERT INTO eventos SET ?';
  const newEvent = { tipo, titulo, descripcion, fecha, hora, ubicacion, profesor_id, materia_id, seccion_id };
  db.query(query, newEvent, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ id: results.insertId, ...newEvent });
  });
});

// Actualizar un evento
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { tipo, titulo, descripcion, fecha, hora, ubicacion, profesor_id, materia_id, seccion_id } = req.body;
  const query = 'UPDATE eventos SET ? WHERE id = ?';
  const updatedEvent = { tipo, titulo, descripcion, fecha, hora, ubicacion, profesor_id, materia_id, seccion_id };
  db.query(query, [updatedEvent, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ id, ...updatedEvent });
  });
});

// Eliminar un evento
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM eventos WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Evento eliminado' });
  });
});

module.exports = router;
