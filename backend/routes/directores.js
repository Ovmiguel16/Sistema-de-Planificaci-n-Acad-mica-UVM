const express = require('express');
const router = express.Router();
const directoresModel = require('../models/directores');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  directoresModel.createDirector(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Director creado exitosamente' });
  });
});

router.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;
  directoresModel.getDirectorByUsername(usuario, (err, director) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!director || director.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: director.id, role: 'director' }, 'tu_secreto', { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  });
});

module.exports = router;
