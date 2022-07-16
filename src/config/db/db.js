const mysql = require("mysql");
const data = require("../json/data");
const { promisify } = require("util");

const pool = mysql.createPool(data.database.CleverCloud);

pool.getConnection((err, conn) => {
  if (err) {
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      return console.log("La conexion de la base de datos fue cerrada");
    }
    if (err.code == "ECONNREFUSED") {
      return console.log("La conexion de la base de datos fue rechazada");
    }
  }

  if (conn) {
    conn.release();
  }
  console.log("DB esta conectada");
  return;
});

pool.query = promisify(pool.query);

module.exports = pool;
