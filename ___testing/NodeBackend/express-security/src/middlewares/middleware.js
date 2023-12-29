exports.globalMiddleware = (req, res, next) => {
  res.locals.localVar = "Alguma coisa";
  next();
};

exports.checkCsrfErr = (err, req, res, next) => {
  if (err && err.code === "EBADCSRFTOKEN") {
    return res.render("error");
  }
  next();
};

exports.getCsrfToken = (req, res, next) => {
  res.locals.token = req.csrfToken();
  next();
};
