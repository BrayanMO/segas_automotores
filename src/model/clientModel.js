//conexion a la base de datos
const db = require("../config/db/db");
const getRows = require("../utils/getRows");

module.exports = class clientModel {
  async addClient(req, res) {
    const {
      address,
      annio,
      certificate,
      document,
      email,
      firstName,
      kilometraje,
      lastName,
      made,
      model,
      observations,
      phone,
      placa,
      tipo_document,
    } = req.body;

    //console.log(req.body);

    const query = `SELECT * FROM cliente_info where documento = "${document}"`;

    db.query(query, (err, rows) => {
      if (rows.length != 0) {
        return res.json({
          cod: 0,
          status:
            "El cliente ya se encuentra registrado, proceda a añadir un nuevo vehiculo a su perfil",
        });
      } else {
        const query = `
        SET @name = ?;
        SET @lastName = ?;
        SET @address = ?;
        SET @tipoDocument = ?;
        SET @document = ?;
        SET @phone = ?;
        SET @email = ?;
        SET @made = ?;
        SET @model = ?;
        SET @annio = ?;
        SET @placa = ?;
        SET @kilometraje = ?;
        SET @observations = ?;
        SET @id_certificado = ?;
        CALL sp_registerClient(@name, @lastName, @address, @tipoDocument, @document, @phone, @email, @made, @model, @annio, @placa, @kilometraje, @observations, @id_certificado );
    `;

        db.query(
          query,
          [
            firstName,
            lastName,
            address,
            tipo_document,
            document,
            phone,
            email,
            made,
            model,
            annio,
            placa,
            kilometraje,
            observations,
            certificate,
          ],
          (err, rows) => {
            if (!err) {
              return res.json({ cod: 1, status: "Registro exitoso" });
            } else {
              return res.json({
                cod: 0,
                status: "Error al registrar al cliente",
                err,
              });
            }
          }
        );
      }
    });
  }

  async getClients(req, res) {
    const query = `
        SELECT c.id_cliente as id, c.nombre, c.apellido, ci.email, ci.telef, ci.documento, ci.direccion FROM cliente c INNER JOIN cliente_info ci on c.id_cliente = ci.id_cliente WHERE c.estado = 1;
    `;

    db.query(query, (err, rows) => {
      if (!err) {
        return res.json(rows);
      } else {
        return res.json({
          cod: 1,
          status: "Fallo al listar los clientes",
          err,
        });
      }
    });
  }

  async getClientDocument(req, res) {
    const { document } = req.params;

    const query = `
      SET @document = ?;
      CALL sp_clientDocument(@document);
    `;

    db.query(query, [document], (err, rows) => {
      if (!err) {
        const row = getRows(rows);

        //console.log(row[0]);
        return res.json(JSON.parse(row[0].json));
      } else {
        return res.json({ cod: 1, status: "Error al cargar datos", err });
      }
    });
  }

  async getTipoDocument(req, res) {
    const query = `SELECT ti.id_tipo_identificacion as id, ti.nombre FROM tipo_identificacion ti`;

    db.query(query, (err, rows) => {
      if (!err) {
        return res.json(rows);
      } else {
        console.log(err);
      }
    });
  }

  async getStatusCertificate(req, res) {
    const query = `SELECT c.id_certificado as id, c.estado as nombre FROM certificado c`;

    db.query(query, (err, rows) => {
      if (!err) {
        return res.json(rows);
      } else {
        console.log(err);
      }
    });
  }

  // async searchClient(req, res) {
  //   const { search } = req.params;
  //   const query = `
  //     SELECT c.id_cliente as id, c.nombre, c.apellido, ci.email, ci.telef, ci.documento, ci.direccion
  //     FROM cliente c INNER JOIN cliente_info ci on c.id_cliente = ci.id_cliente
  //     WHERE nombre LIKE "%${search}%" AND c.estado = 1
  //   `;
  //   db.query(query, (err, rows) => {
  //     if (!err) {
  //       return res.json(rows);
  //     } else {
  //       return res.json({ cod: 0, status: "Error al cargar datos", err });
  //     }
  //   });
  // }

  async deleteClient(req, res) {
    const { id } = req.params;
    const query = `
      UPDATE cliente SET estado = 0 WHERE id_cliente = "${id}"
    `;
    db.query(query, (err, rows) => {
      if (!err) {
        res.status(200).json({
          cod: 1,
          message: "Cliente eliminado correctamente",
        });
      } else {
        res.status(500).json({
          message: "Error al eliminar cliente",
        });
      }
    });
  }

  async updateClient(req, res) {
    const { id } = req.params;
    const { name, lastName, email, phone, documento, address } = req.body;

    const query = `
      UPDATE cliente SET nombre = "${name}", apellido = "${lastName}" WHERE id_cliente = "${id}";

      UPDATE cliente_info SET email = "${email}", telef = "${phone}", direccion = "${address}" WHERE id_cliente = "${id}";
    `;
    db.query(query, (err, rows) => {
      if (!err) {
        res.status(200).json({
          cod: 1,
          message: "Cliente actualizado correctamente",
        });
      } else {
        res.status(500).json({
          message: "Error al actualizar cliente",
        });
      }
    });
  }
};
