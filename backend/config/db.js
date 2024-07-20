const mysql = require('mysql');
const util = require('util');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'uvm_planificacion'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

db.query = util.promisify(db.query);

module.exports = db;
