const User = require("../models/UserModel");

exports.index = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  }
  res.render("login");
};

exports.login = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.enter();

    if (user.errors.length > 0 || !user.user) {
      req.flash("errors", user.errors);
      req.session.save(() => {
        return res.redirect("/login/index");
      });
      return;
    }

    req.session.user = user.user;
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login/index");
};
