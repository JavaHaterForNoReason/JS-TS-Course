exports.homePage = (req, res) => {
  res.render("index");
  return;
};
exports.homePagePost = (req, res) => {
  res.send("Recebido");
};
