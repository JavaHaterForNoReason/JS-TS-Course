const User = require("../models/UserModel");

exports.index = (req, res) => {
  res.render("signup");
};

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.register();

    if (user.errors.length > 0) {
      req.flash("errors", user.errors);
      req.session.save(() => {
        return res.redirect("/signup/index");
      });
      return;
    }

    req.session.user = user.user;
    res.redirect("/contact/index");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
};
