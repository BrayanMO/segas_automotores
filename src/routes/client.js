const express = require("express");
const routes = express.Router();

//Metodos del controlador
const clientController = require("../controller/clientController");
const objClient = new clientController();

// Registrar un cliente
routes.post("/add-client", (req, res) => {
  objClient.addClient(req, res);
});

// Get listClient
routes.get("/list-clients", (req, res) => {
  objClient.getClients(req, res);
});

// Get listClient
routes.get("/client-document/:document", (req, res) => {
  objClient.getClientDocument(req, res);
});

// Get Tipo Documento
routes.get("/tipo-document", (req, res) => {
  objClient.getTipoDocument(req, res);
});

// Get Status Certificate
routes.get("/status-certificate", (req, res) => {
  objClient.getStatusCertificate(req, res);
});

// routes.get("/search-client/:search", (req, res) => {
//   objClient.searchClient(req, res);
// });

routes.delete("/delete-client/:id", (req, res) => {
  objClient.deleteClient(req, res);
});

routes.put("/update-client/:id", (req, res) => {
  objClient.updateClient(req, res);
});

module.exports = routes;
