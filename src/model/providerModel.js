const db = require("../config/db/db");

module.exports = class providerModel {
  async listProviders(req, res) {
    db.query("SELECT * FROM proveedor WHERE estado = 1", (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error al listar proveedores",
        });
      }
      return res.status(200).json(result);
    });
  }

  async register(req, res) {
    const { razon_social, ruc, email, phone, address, city } = req.body;

    const query = `select * from proveedor where ruc = '${ruc}'`;

    db.query(query, (err, result) => {
      if (!err) {
        if (result.length > 0) {
          res.json({
            cod: 0,
            message: "El proveedor ya existe",
          });
        } else {
          const query = `
            Insert into proveedor (razon_social, ruc, direccion, celular, email, ciudad, estado) 
            values ('${razon_social}', '${ruc}', '${address}', '${phone}', '${email}', '${city}', '1');
          `;

          db.query(query, (err, rows) => {
            if (!err) {
              res.status(200).json({
                cod: 1,
                message: "Proveedor registrado correctamente",
              });
            } else {
              res.status(500).json({
                message: "Error al registrar proveedor",
              });
            }
          });
        }
      } else {
        res.status(500).json({
          message: "Error al registrar proveedor",
        });
      }
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const query = `
      UPDATE proveedor SET estado = 0 WHERE id_proveedor = ${id};
    `;

    db.query(query, (err, result) => {
      if (!err) {
        res.status(200).json({
          cod: 1,
          message: "Proveedor eliminado correctamente",
        });
      } else {
        res.status(500).json({
          message: "Error al eliminar proveedor",
        });
      }
    });
  }
};
