const express = require("express");
const routes = express.Router();

const providerController = require("../controller/providerController");
const objProvider = new providerController();

routes.get("/", async (req, res) => {
  objProvider.listProviders(req, res);
});

routes.post("/register", (req, res) => {
  objProvider.register(req, res);
});

routes.delete("/:id", async (req, res) => {
  objProvider.delete(req, res);
});

module.exports = routes;
