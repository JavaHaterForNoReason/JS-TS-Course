const express = require("express");
const router = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginControlller");
const signinController = require("./src/controllers/signinController");
const changePasswordController = require("./src/controllers/changePasswordController");
const contactController = require("./src/controllers/contactController");
const {
  isntUserLogged,
  isUserLogged,
} = require("./src/middlewares/middleware");

router.get("/", isUserLogged, homeController.index);

//Login
router.get("/login/index", isUserLogged, loginController.index);
router.post("/login/index", loginController.login);
router.post("/login/logout", loginController.logout);

//Cadastro
router.get("/signin/index", isUserLogged, signinController.index);
router.post("/signin/index", signinController.register);

// //Mudar senha
router.get("/change-pass/index", isUserLogged, changePasswordController.index);
router.post("/change-pass/index", changePasswordController.change);

//Contatos
router.get("/contact/index", isntUserLogged, contactController.index);
router.get("/contact/add", isntUserLogged, contactController.add);
router.post("/contact/add", contactController.create);
router.get("/contact/edit/:id", isntUserLogged, contactController.edit);
router.post("/contact/edit/:id", contactController.update);
router.post("/contact/delete/:id", contactController.delete);

module.exports = router;
