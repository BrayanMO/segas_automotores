const express = require("express");
const routes = express.Router();

//Metodos del controlador
const adminController = require("../controller/adminController");
const objAdmin = new adminController();

routes.get("/total-clients", (req, res) => {
  objAdmin.TotalClient(req, res);
});

routes.get("/total-convertions", (req, res) => {
  objAdmin.TotalConvertion(req, res);
});

routes.get("/next-mantenimiento", (req, res) => {
  objAdmin.NextMantenimiento(req, res);
});

routes.get("/next-change-filter", (req, res) => {
  objAdmin.NextChangeFilter(req, res);
});

routes.get("/products-stock-min", (req, res) => {
  objAdmin.ProductsStockMin(req, res);
});

routes.get("/products-by-month", (req, res) => {
  objAdmin.ProductsByMonth(req, res);
});

routes.put("/account-profile/:id", (req, res) => {
  objAdmin.UpdateAccount(req, res);
});

routes.get("/account-profile/:id", (req, res) => {
  objAdmin.Account(req, res);
});

routes.put("/account-profile/:id/password", (req, res) => {
  objAdmin.UpdateAccountPassword(req, res);
});

module.exports = routes;
