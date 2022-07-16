const loginModel = require("../model/loginModel");
const objModel = new loginModel();

module.exports = class loginController {
  async login(req, res) {
    const login = await objModel.login(req, res);
    return login;
  }
};
