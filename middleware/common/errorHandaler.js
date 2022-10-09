const createError = require("http-errors");

// 404 not found handaler
function notFoundHandler(req, res, next) {
  next(createError(404, "your request content was not found!"));
}

// default error handaler
function errorHandler(err, req, res, next) {
  // reder take 1st argument file and 2nd argument data pa
  res.render("error", {
    title: "Error page",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
