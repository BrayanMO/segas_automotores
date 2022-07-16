const vehicleModel = require("../model/vehicleModel");
const objVehicle = new vehicleModel();

module.exports = class vehicleController {
  async addVehicle(req, res) {
    const add = await objVehicle.addVehicle(req, res);
    return add;
  }

  async uploadImages(req, res) {
    const upload = await objVehicle.uploadImage(req, res);
    return upload;
  }

  async getVehiculoPlaca(req, res) {
    const getVehiculoPlaca = await objVehicle.getVehiculoPlaca(req, res);
    return getVehiculoPlaca;
  }

  async addConversionVehiculo(req, res) {
    const add = await objVehicle.addConversionVehiculo(req, res);
    return add;
  }

  async getConversionVehiculo(req, res) {
    const getConversionVehiculo = await objVehicle.getConversionVehiculo(
      req,
      res
    );
    return getConversionVehiculo;
  }

  async updateVehicle(req, res) {
    const update = await objVehicle.updateVehicle(req, res);
    return update;
  }
};
