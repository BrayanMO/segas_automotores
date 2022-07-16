const express = require("express");
const routes = express.Router();

//Metodos del controlador
const genericController = require("../controller/genericController");
const objGeneric = new genericController();

//Prueba Generica
routes.get("/", (req, res) => {
  //res.send("La ruta y la validacion del token esta funcionando correctamente");
  objGeneric.leerClient(req, res);
});

module.exports = routes;
