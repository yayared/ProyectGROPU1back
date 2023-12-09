const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const carrito_compras = require("./routes/carrito_compras");
const productos = require("./routes/productos");
const producto_unidad = require("./routes/producto_unidads");
const ventas = require("./routes/ventas");

const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const app = express();
const puerto = 5530;


// Resto de tu configuración de Express...

app.use(express.json());

const swaggerConf = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación de API TECHGROUP",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5530",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};


app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerConf)));

app.use("/api", carrito_compras);
app.use("/api", productos);
app.use("/api", ventas);
app.use("/api", producto_unidad);

mongoose
  .connect(process.env.mongodb)
  .then(() => {
    console.log("Conexion realizada con exito");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(puerto, () => {
  console.log("Servidor escuchando en el puerto " + puerto);
});