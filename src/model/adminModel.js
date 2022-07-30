const moment = require("moment");
const db = require("../config/db/db");
const getRows = require("../utils/getRows");

module.exports = class adminModel {
  /**
   * Ultimas Conversiones a la semana
   */

  async totalClients(req, res) {
    const query = `
        SET @petition = "clients";
        CALL sp_admin( @petition, null);
    `;

    db.query(query, (err, rows) => {
      const row = getRows(rows);
      if (err) {
        return res.status(500).json({
          message: "Error al listar la cantidad total de clientes",
          err,
        });
      }
      return res.json(row[0]);
    });
  }

  async totalConvertion(req, res) {
    const query = `
        SET @petition = "convertions";
        CALL sp_admin( @petition, null);
    `;

    db.query(query, (err, rows) => {
      const row = getRows(rows);
      if (err) {
        return res.status(500).json({
          message:
            "Error al listar la cantidad total de conversion de vehiculos",
          err,
        });
      }
      return res.json(row[0]);
    });
  }

  async nextManteinance(req, res) {
    const query = `
        SET @petition = 'mantenimiento';
        CALL sp_admin( @petition, null);
    `;

    db.query(query, (err, rows) => {
      const row = getRows(rows);
      if (err) {
        return res.status(500).json({
          message: "Error al listar los vehiculos a la proxima mantenimiento",
          err,
        });
      }
      return res.json(row);
    });
  }

  async nextChangeFilter(req, res) {
    const query = `
        SET @petition = 'filter';
        CALL sp_admin( @petition, null);
    `;

    db.query(query, (err, rows) => {
      const row = getRows(rows);
      if (err) {
        return res.status(500).json({
          message: "Error al listar los vehiculos a la proxima mantenimiento",
          err,
        });
      }
      return res.json(row);
    });
  }

  async productsStockMin(req, res) {
    const query = `
        SET @petition = 'product-stock';
        CALL sp_admin( @petition, null);
    `;

    db.query(query, (err, rows) => {
      const row = getRows(rows);
      if (err) {
        return res.status(500).json({
          message: "Error al listar los productos con stock minimo",
          err,
        });
      }
      return res.json(row);
    });
  }

  async productsByMonth(req, res) {
    const date = new Date();

    const query = `
        SET @petition = 'products-used-in-the-month';
        CALL sp_admin( @petition, '${moment(date).format("YYYY-MM-DD")}');
    `;

    db.query(query, (err, rows) => {
      const row = getRows(rows);
      const parse = JSON.parse(row[0].data);

      if (err) {
        return res.status(500).json({
          message: "Error al listar los productos usados en el mes",
          err,
        });
      }
      return res.json(parse);
    });
  }
  
  async updateAccount(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, phone, address } = req.body;

    const query = `
      update personal set ? where id_personal = ?
    `;

    const update = {
      nombre: firstName,
      apellido: lastName,
      telef: phone,
      email,
      direccion: address,
    };

    db.query(query, [update, id], (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "Error al actualizar el usuario",
          err,
        });
      }
      return res.json({ message: "Usuario actualizado" });
    });
  }

  async account(req, res) {
    const { id } = req.params;
    console.log(id);

    const query = `
      SELECT nombre, apellido, telef, email, direccion, id_login FROM personal WHERE id_login = ?
    `;

    db.query(query, [id], (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "Error al obtener la informacion del usuario",
          err,
        });
      }
      return res.json(rows);
    });
  }

  async updatePassword(req, res) {
    const { id } = req.params;
    const { password } = req.body;

    const query = `
      update login set ? where id_login = ?
    `;

    const update = {
      password,
    };

    db.query(query, [update, id], (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "Error al actualizar la constraseña del usuario",
          err,
        });
      }
      return res.json({
        message:
          "Contraseña Actualizada correctamente, inicie sesion nuevamente",
      });
    });
  }
};
