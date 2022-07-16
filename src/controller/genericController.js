const genericModel = require("../model/genericModel");
const objModel = new genericModel();

module.exports = class genericController {
  async leerClient(req, res) {
    const client = await objModel.leerClient(req, res);
    return client;
  }
};
