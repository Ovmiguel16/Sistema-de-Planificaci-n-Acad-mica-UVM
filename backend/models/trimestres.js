const db = require('../config/db');

const getTrimestres = (callback) => {
  const sql = 'SELECT * FROM trimestres';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const createTrimestre = (data, callback) => {
  const { nombre, fechaInicio, fechaFin, diasFestivos } = data;
  const sql = 'INSERT INTO trimestres (nombre, fechaInicio, fechaFin, diasFestivos) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, fechaInicio, fechaFin, diasFestivos], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const updateTrimestre = (id, data, callback) => {
  const { nombre, fechaInicio, fechaFin, diasFestivos } = data;
  const sql = 'UPDATE trimestres SET nombre = ?, fechaInicio = ?, fechaFin = ?, diasFestivos = ? WHERE id = ?';
  db.query(sql, [nombre, fechaInicio, fechaFin, diasFestivos, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const deleteTrimestre = (id, callback) => {
  const sql = 'DELETE FROM trimestres WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  getTrimestres,
  createTrimestre,
  updateTrimestre,
  deleteTrimestre
};
