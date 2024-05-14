const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pr4scfootball'
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida con la base de datos MySQL');
});

module.exports = connection;