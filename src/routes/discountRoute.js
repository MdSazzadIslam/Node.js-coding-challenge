"use strict";

const express = require("express");
const router = express.Router();
const {
  getDiscounts,
  getDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  deleteDiscounts,
} = require("../controllers/discountController");
const { discountRules, validate } = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getDiscounts);
router.get("/:id", getDiscount);
router.post(
  "/create",
  verifyToken,
  [discountRules(), validate],
  createDiscount
);
router.post("/update/:id", verifyToken, updateDiscount);
router.delete("/delete/:id", verifyToken, deleteDiscount);
router.delete("/delete", verifyToken, deleteDiscounts);
module.exports = router;
