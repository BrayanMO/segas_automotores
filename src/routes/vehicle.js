const express = require("express");
const routes = express.Router();

const vehicleController = require("../controller/vehicleController");
const objVehicle = new vehicleController();

const upload = require("../utils/multer/multer");

// anexar un vehiculo a un cliente
routes.post("/add-vehicle/:idClient", (req, res) => {
  objVehicle.addVehicle(req, res);
});

routes.post("/upload-images/:folder", upload.array("image"), (req, res) => {
  objVehicle.uploadImages(req, res);
});

// Get InfoVehiculo por placa
routes.get("/vehiculo-placa/:placa", (req, res) => {
  objVehicle.getVehiculoPlaca(req, res);
});

routes.post("/add-conversion-vehiculo", (req, res) => {
  objVehicle.addConversionVehiculo(req, res);
});

routes.get("/list-conversion-vehiculo/:placa", (req, res) => {
  objVehicle.getConversionVehiculo(req, res);
});

routes.delete("/update-vehicle/:placa", (req, res) => {
  objVehicle.updateVehicle(req, res);
});

routes.post("/update-dates-conversion-vehiculo/:id", (req, res) => {
  objVehicle.updateConversionVehiculo(req, res);
});

module.exports = routes;
