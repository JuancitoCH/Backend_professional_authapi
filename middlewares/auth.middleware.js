const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const { errorResponse } = require("../helpers/responses.helper.js");
const { jwtSecret } = require("../config/config.js");

const validateRol = (...roles) => {
  return (req = request, res = response, next) => {
    const { role } = req.user;
    if (!roles.includes(role))
      return errorResponse(res, { message: "Insufficient permissions" }, 401);
    next();
  };
};

const verifyToken = (req = request, res = response, next) => {
  const token = req.cookies.token || null;
  if (!token)
    return errorResponse(res, { message: "The token is necessary" }, 403);

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.userData = payload;
  } catch (error) {
    return errorResponse(res, error);
  }
  next()
};

module.exports = { validateRol, verifyToken };
