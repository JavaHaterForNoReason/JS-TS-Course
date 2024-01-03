const User = require("../models/UserModel");

exports.index = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  }

  res.render("signin");
};

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.register();

    if (user.errors.length > 0) {
      req.flash("errors", user.errors);
      req.session.save(() => {
        return res.redirect("/signin/index");
      });
      return;
    }

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
};
