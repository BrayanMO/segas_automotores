//conexion a la base de datos
const db = require("../config/db/db");

module.exports = class genericModel {
  async leerClient(req, res) {
    db.query("SELECT * FROM usuario", (err, rows, fields) => {
      if (!err) {
        res.json({ rows, token: req.token });
      } else {
        console.log(err);
      }
    });
  }
};
