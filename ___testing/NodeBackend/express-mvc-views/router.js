const express = require("express");
const router = express.Router();
const { homePage, homePagePost } = require("./src/controllers/homeController");
const { contactPage } = require("./src/controllers/contactController");

//Rotas da home
router.get("/", homePage);
router.post("/", homePagePost);

//Rotas de contato
router.get("/contato", contactPage);

module.exports = router;
