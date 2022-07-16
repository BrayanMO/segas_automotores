const express = require("express");
require("dotenv").config();

//Ruta del token y validacion
const token = require("./src/config/auth/token");
const VerifyToken = require("./src/config/auth/verifyToken");
//Rutas
const generico = require("./src/routes/generic");
const login = require("./src/routes/login");
const client = require("./src/routes/client");
const provider = require("./src/routes/provider");
const vehicle = require("./src/routes/vehicle");
const repuestos = require("./src/routes/repuestos");
const admin = require("./src/routes/admin");

const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3000;
const morgan = require("morgan");

//Conexion a la Base de datos
const pool = require("./src/config/db/db");

const app = express();

//Middlewares
// app.set(cors());
const whitelist = [
  "http://localhost:3000", //Modo desarrollo
  "https://segas.netlify.app", // Deploy en Netlify Manual
  "https://segas-automotores.netlify.app", // Deploy en Netlify Manual
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.json());

// Route Principal
app.get("/", (req, res) =>
  res.json({
    message: "ApiRest for SEGAS AUTOMOTORES",
    dev: "Luis Enrique Morocho Febres",
  })
);

//---- Routes Personalizadas
app.use("/token", token);
app.use("/generic", VerifyToken, generico);
app.use("/login", login);
app.use("/client", VerifyToken, client);
app.use("/providers", VerifyToken, provider);
app.use("/vehicle", VerifyToken, vehicle);
app.use("/repuestos", VerifyToken, repuestos);
app.use("/admin", admin);

app.listen(port, () =>
  console.log(`ApiRest ejecutandose en el puerto: ${port}`)
);
