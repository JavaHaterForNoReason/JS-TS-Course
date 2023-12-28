const express = require("express");
const router = express.Router();
const { homePage, homePagePost } = require("./src/controllers/homeController");
const { contactPage } = require("./src/controllers/contactController");

//Middleware
//Irá executar antes da função homePage vinda do homeController e,
//após isso, usando o comando next(), fará a chamada para a função
//homePage
const middleware = (req, res, next) => {
  console.log();
  console.log("Middleware");
  next();
};

//Rotas da home
router.get("/", middleware, homePage);
router.post("/", homePagePost);

//Rotas de contato
router.get("/contato", contactPage);

module.exports = router;
