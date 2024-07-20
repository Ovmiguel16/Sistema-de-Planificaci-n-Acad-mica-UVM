const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener planificación académica de un profesor
router.get('/profesor/:id', async (req, res) => {
  const profesorId = req.params.id;
  try {
    const [rows] = await db.query(`
      SELECT eventos.*, 
             profesores.nombre AS profesor_nombre, 
             profesores.apellido AS profesor_apellido,
             materias.nombre AS materia_nombre, 
             secciones.nombre AS seccion_nombre
      FROM eventos
      LEFT JOIN profesores ON eventos.profesor_id = profesores.id
      LEFT JOIN materias ON eventos.materia_id = materias.id
      LEFT JOIN secciones ON eventos.seccion_id = secciones.id
      WHERE eventos.profesor_id = ?
    `, [profesorId]);

    console.log('Events data:', rows); // Log para verificar los datos de los eventos
    res.json(rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error al obtener la planificación del profesor' });
  }
});


// Obtener planificación académica de una sección
router.get('/seccion/:id', async (req, res) => {
  const seccionId = req.params.id;
  try {
    const [rows] = await db.query(`
      SELECT eventos.*, 
             profesores.nombre AS profesor_nombre, 
             profesores.apellido AS profesor_apellido,
             materias.nombre AS materia_nombre, 
             secciones.nombre AS seccion_nombre
      FROM eventos
      LEFT JOIN profesores ON eventos.profesor_id = profesores.id
      LEFT JOIN materias ON eventos.materia_id = materias.id
      LEFT JOIN secciones ON eventos.seccion_id = secciones.id
      WHERE eventos.seccion_id = ?
    `, [seccionId]);

    console.log('Events data:', rows); // Log para verificar los datos de los eventos
    res.json(rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error al obtener la planificación de la sección' });
  }
});

module.exports = router;
