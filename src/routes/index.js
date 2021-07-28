"use strict";

const express = require("express");
const userRoute = require("./userRoute");

const router = express.Router();
router.use("/api/v1/ecom", userRoute);

module.exports = router;
