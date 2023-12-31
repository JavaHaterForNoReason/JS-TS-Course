require("dotenv").config();

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flashMsg = require("connect-flash");
const {
  globalMiddleware,
  checkCsrfErr,
  getCsrfToken,
} = require("./src/middlewares/middleware");
const express = require("express");
const router = require("./router");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");

const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("conectou");
    app.emit("pronto");
  })
  .catch((e) => console.error(e));

const sessionOptions = session({
  secret: "Luan1009",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(sessionOptions);
app.use(flashMsg());
app.use(helmet());
app.use(csrf());
app.use(globalMiddleware);
app.use(checkCsrfErr);
app.use(getCsrfToken);
app.use(router);
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.on("pronto", () => {
  app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
    console.log("Acessar: http://localhost:8080");
  });
});
