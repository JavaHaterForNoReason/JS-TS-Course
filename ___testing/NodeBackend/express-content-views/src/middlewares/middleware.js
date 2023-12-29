exports.globalMiddleware = (req, res, next) => {
  res.locals.localVar = "Alguma coisa";
  next();
};
