exports.checkCsrfErr = (err, req, res, next) => {
  if (err) {
    return res.render("error");
  }
  next();
};

exports.getCsrfToken = (req, res, next) => {
  res.locals.token = req.csrfToken();
  res.locals.errors = req.flash("errors");
  res.locals.user = req.session.user;
  next();
};

exports.isntUserLogged = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/");
  }
  next();
};

exports.isUserLogged = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/contact/index");
  }
  next();
};
