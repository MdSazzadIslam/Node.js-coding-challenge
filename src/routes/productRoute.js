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
const {
  registrationRules,
  validateRegistration,
  productRules,
  validateProduct,
} = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post(
  "/create",
  verifyToken,
  [(productRules(), validateProduct)],
  createProduct
);
router.post(
  "/update/:id",
  verifyToken,
  [(registrationRules(), validateRegistration)],
  updateProduct
);
router.delete("/delete/:id", verifyToken, deleteProduct);
router.delete("/delete", verifyToken, deleteProducts);
module.exports = router;
