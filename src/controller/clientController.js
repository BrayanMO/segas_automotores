const clientModel = require("../model/clientModel");
const objModel = new clientModel();

module.exports = class clientController {
  async addClient(req, res) {
    const add = await objModel.addClient(req, res);
    return add;
  }

  async getClients(req, res) {
    const listClient = await objModel.getClients(req, res);
    return listClient;
  }

  async getClientDocument(req, res) {
    const getClientDocument = await objModel.getClientDocument(req, res);
    return getClientDocument;
  }

  async getTipoDocument(req, res) {
    const getTipoDocument = await objModel.getTipoDocument(req, res);
    return getTipoDocument;
  }

  async getStatusCertificate(req, res) {
    const getStatusCertificate = await objModel.getStatusCertificate(req, res);
    return getStatusCertificate;
  }

  // async searchClient(req, res) {
  //   const searchClient = await objModel.searchClient(req, res);
  //   return searchClient;
  // }

  async deleteClient(req, res) {
    const deleteClient = await objModel.deleteClient(req, res);
    return deleteClient;
  }

  async updateClient(req, res) {
    const updateClient = await objModel.updateClient(req, res);
    return updateClient;
  }
};
