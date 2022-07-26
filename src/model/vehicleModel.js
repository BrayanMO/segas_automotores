const db = require("../config/db/db");
const cloudinary = require("../utils/Upload/Cloudinary/cloudinary");
const fs = require("fs");
const moment = require("moment");
const getRows = require("../utils/getRows");

module.exports = class vehicleModel {
  async addVehicle(req, res) {
    const {
      annio,
      certificate,
      kilometraje,
      made,
      model,
      observations,
      placa,
    } = req.body;

    const { idClient } = req.params;

    const query = `
      SELECT v.placa, v.modelo, v.marca, c.nombre, c.apellido FROM vehiculo v 
      INNER JOIN cliente c on v.id_cliente= c.id_cliente 
      WHERE placa = "${placa}" AND v.estado = 1;
    `;

    db.query(query, (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          return res.status(226).json({
            message: `El vehiculo se encuentra registrado a nombre de ${rows[0].nombre} ${rows[0].apellido}`,
          });
        } else {
          const query = `
            INSERT INTO vehiculo (id_certificado, id_cliente, marca, modelo, annio, placa, kilometraje, observaciones)
            VALUES( "${certificate}", "${idClient}", "${made}", "${model}", "${annio}", "${placa}", "${kilometraje}", "${observations}")
          `;

          db.query(query, (err, rows) => {
            if (!err) {
              return res.status(200).json({ message: "Registro exitoso" });
            } else {
              console.log(err);
              return res.json({
                message: "Error al registrar el vehiculo",
                err,
              });
            }
          });
        }
      } else {
        return res.status(400).json({
          message: "Error al registrar el vehiculo",
          err,
        });
      }
    });
  }

  async uploadImage(req, res) {
    const { folder } = req.params;

    if (!req.files) return res.send("Por favor seleccione imagenes");

    var uploader;

    if (folder.includes("certificate")) {
      uploader = async (path) => await cloudinary.uploads(path, "certificado");
    } else if (folder.includes("collage")) {
      uploader = async (path) => await cloudinary.uploads(path, "collage");
    }

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

  async getVehiculoPlaca(req, res) {
    const { placa } = req.params;

    const query = `
          SELECT v.id_vehiculo, c.nombre, c.apellido, Max(cv.date_ingreso) AS "ultima_revision"
          FROM   vehiculo v
              INNER JOIN cliente c ON v.id_cliente = c.id_cliente
              LEFT JOIN convert_vehiculo cv ON v.id_vehiculo = cv.id_vehiculo
          WHERE  v.placa = "${placa}"
          AND c.estado = 1 AND v.estado = 1; 
        `;

    db.query(query, (err, rows) => {
      if (!err) {
        return res.json(rows[0]);
      } else {
        return res.json({ cod: 1, status: "Error al cargar datos", err });
      }
    });
  }

  async addConversionVehiculo(req, res) {
    const {
      idVehiculo,
      garantia,
      fechaNextRevision,
      fechaChangeFilter,
      fechaMantenimiento,
      imgCertificate,
      imgsCollage,
      products,
    } = req.body;

    //console.log(req.body);

    const date = moment(new Date()).format("YYYY-MM-DD");

    const queryProcedure = `
          SET @id_vehiculo = ?;
          SET @date_ingreso = ?;
          SET @garantia = ?;
          SET @fecha_next_revision = ?;
          SET @fecha_change_filter = ?;
          SET @fecha_mantenimiento = ?;
          SET @img_certificate = ?;
          SET @img_collage = ?;
          SET @products = ?;
          CALL sp_convert_vehiculo(@id_vehiculo, @date_ingreso, @garantia, @fecha_next_revision, @fecha_change_filter, @fecha_mantenimiento, @img_certificate, @img_collage, @products);
        `;

    db.query(
      queryProcedure,
      [
        idVehiculo,
        date,
        garantia,
        fechaNextRevision,
        fechaChangeFilter,
        fechaMantenimiento,
        imgCertificate,
        imgsCollage,
        products,
      ],
      (err, rows) => {
        if (!err) {
          return res.json({ cod: 1, message: "Registro exitoso" });
        } else {
          return res.json({
            cod: 0,
            message: "Error al anexar el vehiculo al cliente",
            err,
          });
        }
      }
    );
  }

  async getConversionVehiculo(req, res) {
    const { placa } = req.params;

    const query = `
      SET @placa = ?;
      CALL sp_vehiculo_conversion(@placa);
    `;

    db.query(query, [placa], (err, rows) => {
      if (!err) {
        const row = getRows(rows);
        return res.json(JSON.parse(row[0].json));
      } else {
        return res.json({ cod: 1, status: "Error al cargar datos", err });
      }
    });
  }

  async updateVehicle(req, res) {
    const { placa } = req.params;

    const query = `
      UPDATE vehiculo
      SET estado = 0
      WHERE placa = "${placa}";
    `;

    db.query(query, (err, rows) => {
      if (!err) {
        return res.status(200).json({ message: "Actualizacion correcta" });
      } else {
        return res.status(400).json({
          message: "Error al dar de baja el vehiculo",
          err,
        });
      }
    });
  }

  async updateConversionVehiculo(req, res) {
    const query = ` 
      SELECT date_next_revision, date_change_filtro, date_mantenimiento, history_date 
      FROM convert_vehiculo WHERE id_convert = ${req.params.id};
    `;

    db.query(query, (err, rows) => {
      try {
        const row =
          rows === undefined ? [] : rows[0].history_date === null ? [] : rows;

        let history = JSON.parse(row.length != 0 ? row[0].history_date : `[]`);

        // console.log(history, "history");

        if (!history.length) {
          history.push({
            date_revision: moment(rows[0].date_next_revision).format(
              "YYYY-MM-DD"
            ),
            date_change_filtro: moment(rows[0].date_change_filtro).format(
              "YYYY-MM-DD"
            ),
            date_mantenimiento: moment(rows[0].date_mantenimiento).format(
              "YYYY-MM-DD"
            ),
          });
        } else {
          history = [
            ...history,
            {
              date_revision: moment(rows[0].date_next_revision).format(
                "YYYY-MM-DD"
              ),
              date_change_filtro: moment(rows[0].date_change_filtro).format(
                "YYYY-MM-DD"
              ),
              date_mantenimiento: moment(rows[0].date_mantenimiento).format(
                "YYYY-MM-DD"
              ),
            },
          ];
        }

        const update = {
          history_date: JSON.stringify(history),
          date_next_revision: req.body.newDateRevision,
          date_change_filtro: req.body.newDateChangeFiltro,
          date_mantenimiento: req.body.newDateMantenimiento,
        };

        const query2 = `
          update convert_vehiculo
          set ?
          where id_convert = ${req.params.id};
        `;

        db.query(query2, [update], (err, rows) => {
          if (!err) {
            return res.status(200).json({ message: "Actualizacion correcta" });
          } else {
            return res.status(400).json({
              message: "Error al actualizar el vehiculo",
              err,
            });
          }
        });
      } catch (err) {
        return res.status(400).json({
          message: "Error al actualizar el vehiculo",
          err,
        });
      }
    });
  }

};
