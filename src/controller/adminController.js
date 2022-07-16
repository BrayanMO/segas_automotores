const adminModel = require("../model/adminModel");
const objModel = new adminModel();

module.exports = class adminController {
  async TotalClient(req, res) {
    const total_client = await objModel.totalClients(req, res);
    return total_client;
  }

  async TotalConvertion(req, res) {
    const total_convertion = await objModel.totalConvertion(req, res);
    return total_convertion;
  }

  async NextMantenimiento(req, res) {
    const next_mantenimiento = await objModel.nextManteinance(req, res);
    return next_mantenimiento;
  }

  async NextChangeFilter(req, res) {
    const next_change_filter = await objModel.nextChangeFilter(req, res);
    return next_change_filter;
  }

  async ProductsStockMin(req, res) {
    const products_stock_min = await objModel.productsStockMin(req, res);
    return products_stock_min;
  }

  async ProductsByMonth(req, res) {
    const products_by_month = await objModel.productsByMonth(req, res);
    return products_by_month;
  }
};
