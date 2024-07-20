const db = require('../config/db');

const createMateria = (data, callback) => {
  const { codigo, nombre, descripcion, profesor_id } = data;
  const sqlInsertMateria = 'INSERT INTO materias (codigo, nombre, descripcion, profesor_id) VALUES (?, ?, ?, ?)';

  db.query(sqlInsertMateria, [codigo, nombre, descripcion, profesor_id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const getMaterias = (callback) => {
  const sql = 'SELECT m.id, m.codigo, m.nombre, m.descripcion, p.nombre AS profesor FROM materias m LEFT JOIN profesores p ON m.profesor_id = p.id';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  createMateria,
  getMaterias
};
