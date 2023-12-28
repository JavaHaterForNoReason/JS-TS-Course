const HomeModel = require("../models/HomeModel");

HomeModel.create({
  titulo: "Teste",
  descricao: "teste",
})
  .then((dados) => console.log(dados))
  .catch((e) => console.error(e));

exports.homePage = (req, res) => {
  res.render("index");
  return;
};
exports.homePagePost = (req, res) => {
  res.send("Recebido");
};
