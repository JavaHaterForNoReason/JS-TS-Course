exports.homePage = (req, res) => {
  res.render("index");
};
exports.homePagePost = (req, res) => {
  res.send("Recebido");
};
