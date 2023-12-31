exports.homePage = (req, res) => {
  res.render("index", {
    titulo: "Título",
  });
};
exports.homePagePost = (req, res) => {
  res.send(req.body);
};
