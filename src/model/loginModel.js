//conexion a la base de datos
const db = require("../config/db/db");
const jwt = require("jsonwebtoken");
const data = require("../config/json/data");
const getRows = require("../utils/getRows");

module.exports = class loginModel {
  async login(req, res) {
    const payload = data.jwt;
    const { email, password } = req.body;
    const query = `
        SET @user = ?;
        SET @password = ?;
        CALL sp_login(@user, @password, @a, @b );
        SELECT @a AS id, @b AS usuario;
    `;

    jwt.sign({ payload }, "secretkey", (err, jwt) => {
      db.query(query, [email, password], (err, rows, fields) => {
        if (!err) {
          const row = getRows(rows);
          if (!row[0].usuario) return res.json({ user: null });
          return res.json({
            user: row[0].usuario,
            id: row[0].id,
            jwt,
          });
        } else {
          console.log(err);
        }
      });
    });
  }
};
