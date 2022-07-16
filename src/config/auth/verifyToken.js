const jwt = require("jsonwebtoken");
//Archivo de configuracion

module.exports = function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];

    jwt.verify(bearerToken, "secretkey", (error, authData) => {
      if (error) {
        return res
          .status(403)
          .send({ message: "Error de comprobacion del token" });
      } else {
        // return res.json({ message: "Validacion Correcta", authData });
        req.token = bearerToken;
        next();
      }
    });
  } else {
    return res.send({ message: "No presenta token" });
  }
};
