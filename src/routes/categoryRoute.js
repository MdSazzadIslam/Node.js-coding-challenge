"use strict";

const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
} = require("../controllers/categoryController");
const { categoryRules, validate } = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post(
  "/create",
  verifyToken,
  [(categoryRules(), validate)],
  createCategory
);
router.put("/update/:id", verifyToken, updateCategory);
router.delete("/delete/:id", verifyToken, deleteCategory);
router.delete("/delete", verifyToken, deleteCategories);
module.exports = router;
