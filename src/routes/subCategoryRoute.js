"use strict";

const express = require("express");
const router = express.Router();
const {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteSubCategories,
} = require("../controllers/subCategoryController");
const { subcategoryRules, validate } = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getSubCategories);
router.get("/:id", getSubCategory);
router.post(
  "/create",
  verifyToken,
  [subcategoryRules(), validate],
  createSubCategory
);
router.put("/update/:id", updateSubCategory);
router.delete("/delete/:id", verifyToken, deleteSubCategory);
router.delete("/delete", verifyToken, deleteSubCategories);
module.exports = router;
