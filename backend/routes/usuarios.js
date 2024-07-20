const express = require('express');
const router = express.Router();
const usuariosModel = require('../models/usuarios');

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
  usuariosModel.getUsuarios((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
  usuariosModel.createUsuario(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  });
});

// Ruta para verificar inicio de sesión
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  usuariosModel.verifyUsuario(email, password, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', role: user.rol });
  });
});

// Ruta para actualizar un usuario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  usuariosModel.updateUsuario(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  });
});

// Ruta para eliminar un usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  usuariosModel.deleteUsuario(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  });
});

module.exports = router;
