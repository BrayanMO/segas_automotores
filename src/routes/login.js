const express = require("express");
const routes = express.Router();

//Metodos del controlador
const loginController = require("../controller/loginController");
const objLogin = new loginController();

//Prueba Generica
routes.post("/admin", (req, res) => {
  objLogin.login(req, res);
});

module.exports = routes;
