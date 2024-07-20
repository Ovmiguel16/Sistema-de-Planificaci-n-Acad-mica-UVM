const db = require('../config/db');

const createProfesor = (data, callback) => {
  const { nombre, apellido, correo, telefono, usuario, contrasena } = data;
  const sqlInsertProfesor = 'INSERT INTO profesores (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)';
  const sqlInsertAcceso = 'INSERT INTO acceso_profesores (usuario, contrasena, profesor_id) VALUES (?, ?, ?)';

  db.query(sqlInsertProfesor, [nombre, apellido, correo, telefono], (err, result) => {
    if (err) return callback(err);

    const profesorId = result.insertId;

    db.query(sqlInsertAcceso, [usuario, contrasena, profesorId], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  });
};

const getProfesores = (callback) => {
  const sql = 'SELECT p.id, p.nombre, p.apellido, p.correo, p.telefono, a.usuario FROM profesores p JOIN acceso_profesores a ON p.id = a.profesor_id';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const updateProfesor = (id, data, callback) => {
  const { nombre, apellido, correo, telefono, usuario, contrasena } = data;
  const sqlUpdateProfesor = 'UPDATE profesores SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id = ?';
  const sqlUpdateAcceso = 'UPDATE acceso_profesores SET usuario = ?, contrasena = ? WHERE profesor_id = ?';

  db.query(sqlUpdateProfesor, [nombre, apellido, correo, telefono, id], (err, result) => {
    if (err) return callback(err);

    db.query(sqlUpdateAcceso, [usuario, contrasena, id], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  });
};

const deleteProfesor = (id, callback) => {
  const sqlDeleteAcceso = 'DELETE FROM acceso_profesores WHERE profesor_id = ?';
  const sqlDeleteProfesor = 'DELETE FROM profesores WHERE id = ?';

  db.query(sqlDeleteAcceso, [id], (err, result) => {
    if (err) return callback(err);

    db.query(sqlDeleteProfesor, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  });
};

const getProfesorByUsername = (usuario, callback) => {
  const sql = 'SELECT p.id, p.nombre, p.apellido, p.correo, p.telefono, a.usuario, a.contrasena FROM profesores p JOIN acceso_profesores a ON p.id = a.profesor_id WHERE a.usuario = ?';
  db.query(sql, [usuario], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

module.exports = {
  createProfesor,
  getProfesores,
  updateProfesor,
  deleteProfesor,
  getProfesorByUsername
};
