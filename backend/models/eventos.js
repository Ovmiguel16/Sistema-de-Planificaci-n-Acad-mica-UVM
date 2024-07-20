const db = require('../config/db');

const createEvento = (data, callback) => {
  const { tipo, titulo, descripcion, fecha, hora, ubicacion, profesor_id, materia_id } = data;
  const sqlInsertEvento = 'INSERT INTO eventos (tipo, titulo, descripcion, fecha, hora, ubicacion, profesor_id, materia_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sqlInsertEvento, [tipo, titulo, descripcion, fecha, hora, ubicacion, profesor_id, materia_id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const getEventos = (callback) => {
  const sql = 'SELECT e.id, e.tipo, e.titulo, e.descripcion, e.fecha, e.hora, e.ubicacion, p.nombre AS profesor, m.nombre AS materia FROM eventos e LEFT JOIN profesores p ON e.profesor_id = p.id LEFT JOIN materias m ON e.materia_id = m.id';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  createEvento,
  getEventos
};
