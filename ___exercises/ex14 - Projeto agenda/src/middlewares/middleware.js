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
