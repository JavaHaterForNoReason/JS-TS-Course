const User = require("../models/UserModel");

exports.index = (req, res) => {
  res.render("change-pass");
};

exports.change = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.changePass();

    if (user.errors.length > 0) {
      req.flash("errors", user.errors);
      req.session.save(() => {
        return res.redirect("/change-pass/index");
      });
      return;
    }

    res.redirect("/login/index");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
};
