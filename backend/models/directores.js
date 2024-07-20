const db = require('../config/db');

const createDirector = (data, callback) => {
  const { nombre, apellido, correo, telefono, usuario, contrasena } = data;
  const sqlInsertDirector = 'INSERT INTO directores (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)';
  const sqlInsertAcceso = 'INSERT INTO acceso_directores (usuario, contrasena, director_id) VALUES (?, ?, ?)';

  db.query(sqlInsertDirector, [nombre, apellido, correo, telefono], (err, result) => {
    if (err) return callback(err);

    const directorId = result.insertId;

    db.query(sqlInsertAcceso, [usuario, contrasena, directorId], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  });
};

const getDirectorByUsername = (usuario, callback) => {
  const sql = 'SELECT d.id, d.nombre, d.apellido, d.correo, d.telefono, a.usuario, a.contrasena FROM directores d JOIN acceso_directores a ON d.id = a.director_id WHERE a.usuario = ?';
  db.query(sql, [usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

module.exports = {
  createDirector,
  getDirectorByUsername
};
