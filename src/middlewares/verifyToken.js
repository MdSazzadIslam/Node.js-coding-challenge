"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader)
    return res
      .status(403)
      .send({ status: "false", message: "No token provided." });

  const token = bearerHeader.split(" ")[1];

  await jwt.verify(token, process.env.JWT_SECRECT_KEY, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ status: "false", message: "Failed to authenticate token." });

    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
