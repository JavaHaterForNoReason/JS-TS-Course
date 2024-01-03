exports.index = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  }
  res.render("index");
};

exports.home = (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
  }
  res.render("home");
};
