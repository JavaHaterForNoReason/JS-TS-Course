require("dotenv").config();

const express = require("express");
const router = require("./router");
const path = require("path");

const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("conectou");
    app.emit("pronto");
  })
  .catch((e) => console.error(e));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(router);
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.on("pronto", () => {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
    console.log("Acessar: http://localhost:3000");
  });
});
