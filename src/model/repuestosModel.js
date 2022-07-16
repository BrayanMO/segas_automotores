const db = require("../config/db/db");
const cloudinary = require("../utils/Upload/Cloudinary/cloudinary");
const fs = require("fs");

module.exports = class repuestosModel {
  async addRepuesto(req, res) {
    const { items } = req.body;

    const query = `INSERT INTO repuestos (id_proveedor, nombre, marca, stock, precio_costo, precio_venta, imgs_repuestos, estado) VALUES ?`;

    db.query(
      query,
      [
        items.map((item) => [
          item.id_proveedor,
          item.product,
          item.made,
          item.stock,
          item.precio_compra,
          item.precio_venta,
          item.imgsRepuestos,
          1,
        ]),
      ],
      (err, rows) => {
        if (!err) {
          return res.status(200).json({
            message: "Repuestos agregados correctamente",
          });
        } else {
          return res.status(500).json({
            message: "Error al agregar los repuestos",
            err,
          });
        }
      }
    );
  }

  async uploadImage(req, res) {
    const { folder } = req.params;

    if (!req.files) return res.send("Por favor seleccione imagenes");

    const uploader = async (path) =>
      await cloudinary.uploads(path, `${folder}`);

    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json({
      cod: 1,
      status: "Subida de imagenes satisfactoria",
      data: urls,
    });
  }

  async destroyImage(req, res) {
    const { id } = req.body;

    const response = await cloudinary.destroy(`${id}`);

    if (response.result === "ok") {
      return res.status(200).json({
        cod: 1,
        message: "Imagen eliminada correctamente",
      });
    } else {
      return res.status(500).json({
        cod: 0,
        message: "Error al eliminar la imagen",
      });
    }
  }

  async getProveedor(req, res) {
    const query = `
        SELECT p.id_proveedor AS id,
        p.razon_social AS nombre FROM proveedor p;
    `;

    db.query(query, (err, rows) => {
      if (!err) {
        return res.status(200).json(rows);
      } else {
        return res.status(500).json({
          cod: 0,
          status: "Error al cargar los proveedores",
        });
      }
    });
  }

  async getRepuestos(req, res) {
    const query = `
      SELECT 
        r.id_repuesto as id, pr.razon_social, r.nombre, r.marca, r.stock, 
        r.precio_costo, r.precio_venta, r.imgs_repuestos, r.estado
      FROM repuestos r INNER JOIN proveedor pr 
        ON r.id_proveedor = pr.id_proveedor
      WHERE r.estado = 1;
    `;

    db.query(query, (err, rows) => {
      if (err) {
        return res.json({
          cod: 0,
          status: "Error al cargar los productos",
          err,
        });
      } else {
        return res.json(rows);
      }
    });
  }

  async getRepuestoById(req, res) {
    const { id } = req.params;

    const query = `
      SELECT r.nombre, r.marca, r.stock, r.precio_costo, r.precio_venta, r.imgs_repuestos, r.estado, p.razon_social FROM repuestos r 
      INNER JOIN proveedor p ON r.id_proveedor = p.id_proveedor
      WHERE id_repuesto = "${id}";
    `;

    db.query(query, (err, rows) => {
      if (!err) {
        return res.status(200).json(rows[0]);
      } else {
        return res.status(500).json({
          message: "Error al cargar los productos",
          err,
        });
      }
    });
  }

  async updateRepuesto(req, res) {
    const { id, nombre, precio_costo, precio_venta, marca, stock } = req.body;

    console.log(req.body);

    const query = `
      UPDATE repuestos 
      SET nombre = "${nombre}", precio_costo = "${precio_costo}", precio_venta = "${precio_venta}", marca = "${marca}", stock = "${stock}"
      WHERE id_repuesto = "${id}";
    `;

    console.log(query);

    db.query(query, (err, rows) => {
      if (!err) {
        return res.status(200).json({
          message: "Repuesto actualizado correctamente",
        });
      } else {
        return res.status(500).json({
          message: "Error al actualizar el repuesto",
          err,
        });
      }
    });
  }

  async deleteRepuesto(req, res) {
    const { id } = req.params;

    const query = `
      UPDATE repuestos SET estado = 0 WHERE id_repuesto = "${id}";
    `;

    db.query(query, (err, rows) => {
      if (!err) {
        return res.status(200).json({
          message: "Repuesto dato de baja correctamente",
        });
      } else {
        return res.status(500).json({
          message: "Error al eliminar el repuesto",
          err,
        });
      }
    });
  }

  async updateStockRepuesto(req, res) {
    const { products } = req.body;

    //console.log(typeof products);

    products.forEach((product, index) => {
      const query = `
        UPDATE repuestos SET stock = stock - ? WHERE id_repuesto = ?
      `;

      db.query(query, [product.cantidad, product.id], (err, rows) => {
        if (index + 1 === products.length) {
          if (!err) {
            return res.status(200).json({
              message: "Stock actualizado correctamente",
            });
          } else {
            return res.status(500).json({
              message: "Error al actualizar el stock",
              err,
            });
          }
        }
      });
    });
  }
};
