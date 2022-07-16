const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const data = require("../json/data");

route.use("/", (req, res) => {
  const user = data.jwt;

  /**
   * Codigo cuando se requiere que el token expire en un determinado tiempo
   * El timpo de expiracion puede ser en segundos, horas o dias despues de haber creado el token
   * example: 30s, 1h, 2 days
   * jwt.sign({ user }, "secretkey", {expiresIn: "1h"} (err, token) => {
   */

  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({ token });
  });
});

module.exports = route;
