const repuestosModel = require("../model/repuestosModel");
const objModel = new repuestosModel();

module.exports = class repuestosController {
  async addRepuesto(req, res) {
    const add = await objModel.addRepuesto(req, res);
    return add;
  }

  async uploadImage(req, res) {
    const upload = await objModel.uploadImage(req, res);
    return upload;
  }

  async destroyImage(req, res) {
    const destroyImage = await objModel.destroyImage(req, res);
    return destroyImage;
  }

  async getProveedor(req, res) {
    const getProveedor = await objModel.getProveedor(req, res);
    return getProveedor;
  }

  async getRepuestos(req, res) {
    const getRepuestos = await objModel.getRepuestos(req, res);
    return getRepuestos;
  }

  async getRepuestoById(req, res) {
    const getRepuestoById = await objModel.getRepuestoById(req, res);
    return getRepuestoById;
  }

  async updateRepuesto(req, res) {
    const updateRepuesto = await objModel.updateRepuesto(req, res);
    return updateRepuesto;
  }

  async deleteRepuesto(req, res) {
    const deleteRepuesto = await objModel.deleteRepuesto(req, res);
    return deleteRepuesto;
  }

  async updateStockRepuesto(req, res) {
    const updateStockRepuesto = await objModel.updateStockRepuesto(req, res);
    return updateStockRepuesto;
  }
};
