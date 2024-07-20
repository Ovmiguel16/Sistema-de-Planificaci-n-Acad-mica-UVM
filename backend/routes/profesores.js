const express = require('express');
const router = express.Router();
const profesoresModel = require('../models/profesores');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  profesoresModel.createProfesor(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Profesor creado exitosamente' });
  });
});
router.post('/register', (req, res) => {
  profesoresModel.createProfesor(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const { usuario, contrasena } = result;

    profesoresModel.getProfesorByUsername(usuario, (err, profesor) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!profesor || profesor.contrasena !== contrasena) {
        return res.status(401).json({ error: 'Error al iniciar sesión automáticamente después del registro' });
      }

      const token = jwt.sign({ id: profesor.id, role: 'profesor' }, 'tu_secreto', { expiresIn: '1h' });
      res.status(200).json({ message: 'Registro y inicio de sesión exitosos', token, role: 'profesor' });
    });
  });
});

router.get('/', (req, res) => {
  profesoresModel.getProfesores((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

router.put('/:id', (req, res) => {
  profesoresModel.updateProfesor(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Profesor actualizado exitosamente' });
  });
});

router.delete('/:id', (req, res) => {
  profesoresModel.deleteProfesor(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Profesor eliminado exitosamente' });
  });
});

router.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;
  profesoresModel.getProfesorByUsername(usuario, (err, profesor) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!profesor || profesor.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: profesor.id, role: 'profesor' }, 'tu_secreto', { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  });
});

module.exports = router;
