"use strict";

const express = require("express");
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const categoryRoute = require("./categoryRoute");
const subCategoryRoute = require("./subCategoryRoute");
const discountRoute = require("./discountRoute");
const orderRoute = require("./orderRoute");

const router = express.Router();
router.use("/api/v1/ecom/user", userRoute);
router.use("/api/v1/ecom/product", productRoute);
router.use("/api/v1/ecom/category", categoryRoute);
router.use("/api/v1/ecom/subCategory", subCategoryRoute);
router.use("/api/v1/ecom/discount", discountRoute);
router.use("/api/v1/ecom/order", orderRoute);

module.exports = router;
