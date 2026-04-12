const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config({ path: "./config/.env" });

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/status", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "API funcionando correctamente" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
