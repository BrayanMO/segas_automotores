const express = require("express");
const routes = express.Router();

const upload = require("../utils/multer/multer");

const repuestosController = require("../controller/repuestosController");
const objRepuestos = new repuestosController();

routes.post("/add-repuesto", (req, res) => {
  objRepuestos.addRepuesto(req, res);
});

routes.post("/upload-image/:folder", upload.array("image"), (req, res) => {
  objRepuestos.uploadImage(req, res);
});

routes.get("/list-proveedor", (req, res) => {
  objRepuestos.getProveedor(req, res);
});

routes.post("/destroy-image", (req, res) => {
  objRepuestos.destroyImage(req, res);
});

routes.get("/list-repuestos", (req, res) => {
  objRepuestos.getRepuestos(req, res);
});

routes.get("/get-repuesto/:id", (req, res) => {
  objRepuestos.getRepuestoById(req, res);
});

routes.put("/update-repuesto", (req, res) => {
  objRepuestos.updateRepuesto(req, res);
});

routes.delete("/delete-repuesto/:id", (req, res) => {
  objRepuestos.deleteRepuesto(req, res);
});

routes.put("/discount-stock-repuesto-conversion", (req, res) => {
  objRepuestos.updateStockRepuesto(req, res);
});

module.exports = routes;
