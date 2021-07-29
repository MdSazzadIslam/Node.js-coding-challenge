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
} = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProduct);
router.post("/create", createProduct);
router.post(
  "/update/:id",
  [registrationRules(), validateRegistration],
  updateProduct
);
router.delete("/delete/:id", verifyToken, deleteProduct);
router.delete("/delete", verifyToken, deleteProducts);
module.exports = router;
