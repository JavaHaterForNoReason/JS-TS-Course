exports.homePage = (req, res) => {
  res.render("index", {
    titulo: "Título",
    numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  });
  return;
};
exports.homePagePost = (req, res) => {
  res.send("Recebido");
};
