const db = require('../config/db');

const getUsuarios = (callback) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const createUsuario = (data, callback) => {
  const { nombre, apellido, correo, telefono, rol, contrasena } = data;
  const sql =
    "INSERT INTO usuarios (nombre, apellido, correo, telefono, rol, contrasena) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, apellido, correo, telefono, rol, contrasena],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

const verifyUsuario = (email, password, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

const updateUsuario = (id, data, callback) => {
  const { nombre, apellido, correo, telefono, rol } = data;
  const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, telefono = ?, rol = ? WHERE id = ?';
  db.query(sql, [nombre, apellido, correo, telefono, rol, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const deleteUsuario = (id, callback) => {
  const sql = 'DELETE FROM usuarios WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  getUsuarios,
  createUsuario,
  verifyUsuario,
  updateUsuario,
  deleteUsuario
};
