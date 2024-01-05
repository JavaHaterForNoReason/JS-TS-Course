const express = require("express");
const router = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginControlller");
const signinController = require("./src/controllers/signinController");
const changePasswordController = require("./src/controllers/changePasswordController");
const contactController = require("./src/controllers/contactController");

router.get("/", homeController.index);
router.get("/home", homeController.home);

//Login
router.get("/login/index", loginController.index);
router.get("/login/logout", loginController.logout);
router.post("/login/login", loginController.login);

//Cadastro
router.get("/signin/index", signinController.index);
router.post("/signin/register", signinController.register);

// //Mudar senha
router.get("/change-pass/index", changePasswordController.index);
router.post("/change-pass/change", changePasswordController.change);

//Contatos
router.get("/contact/index", contactController.index);

module.exports = router;
