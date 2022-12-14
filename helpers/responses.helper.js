//import { response } from "express";
const response = require("express").response;
const { jwt_secret } = require("../config/envs.js");
const jwt = require("jsonwebtoken");

const errorResponse = (res = response, error, status = 500) => {
  if (error.hasOwnProperty("code") || error.hasOwnProperty("errors")) {
    if (error.code === 11000) {
      return res.status(400).json({
        ok: false,
        errors: Object.keys(error.keyValue).map((field) => ({
          message: `The ${field} ${error.keyValue[field]} is already in use`,
        })),
      });
    }

    return res.status(400).json({
      ok: false,
      errors: Object.values(error.errors).map(({ message }) => ({
        message,
      })),
    });
  }

  return res.status(status).json({
    ok: false,
    errors: [{ message: error.message || error }],
  });
};

const authResponse = async (
  res = response,
  status,
  ok,
  message,
  data,
  isprovider = false
) => {
  const { data:payload, token } = data;
  let exp;
  try {
    exp = jwt.verify(token, jwt_secret).exp;
  } catch (error) {
    return errorResponse(res, error, 500);
  }
  return res
        .status(status)
        .cookie("token", token, {
          httpOnly: true,
          // secure: true,
          // sameSite: "none",
          expires: new Date(exp * 1000),
        })
        .json({ ok, message, ...payload });
};

const successfulResponse = (
  res = response,
  status,
  ok,
  message,
  data = null
) => {
  return data
    ? res.status(status).json({
        ok,
        message,
        data,
      })
    : res.status(status).json({
        ok,
        message,
      });
};

const logoutResponse = (res = response) => {
  return res.clearCookie("token").status(200).json({
    ok: true,
    message: "Session was successfully closed",
  });
};

module.exports = { errorResponse, authResponse, successfulResponse, logoutResponse };
