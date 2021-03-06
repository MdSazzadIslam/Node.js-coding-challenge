"use strict";

const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
} = require("../controllers/productController");
const { productRules, validate } = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/create", verifyToken, [productRules(), validate], createProduct);
router.put("/update/:id", verifyToken, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);
router.delete("/delete", verifyToken, deleteProducts);
module.exports = router;
