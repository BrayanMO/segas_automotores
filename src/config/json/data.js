require("dotenv").config();

const data = {
  database: {
    mysql: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "segas",
      multipleStatements: true,
    },
    CleverCloud: {
      host: process.env.host,
      port: 3306,
      user: process.env.user,
      password: process.env.pass,
      database: process.env.dbName,
      multipleStatements: true,
    },
  },
  jwt: {
    id: process.env.idJWT,
    nombre: process.env.nombre,
    email: process.env.email,
  },
};

module.exports = data;
