function getConnection(){
  const mysql = require('mysql');
  const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'gestion_academica_tranzoategui',
    bigNumberStrings: true
  });
  return pool;
}
module.exports = getConnection();