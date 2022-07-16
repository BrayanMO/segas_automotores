const providerModel = require("../model/providerModel");
const objProvider = new providerModel();

module.exports = class providerController {
  async listProviders(req, res) {
    const listProviders = await objProvider.listProviders(req, res);
    return listProviders;
  }

  async register(req, res) {
    const register = await objProvider.register(req, res);
    return register;
  }

  async delete(req, res) {
    const deleteProvider = await objProvider.delete(req, res);
    return deleteProvider;
  }
};
