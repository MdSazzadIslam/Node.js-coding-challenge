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
const {
  registrationRules,
  validateRegistration,
} = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getSubCategories);
router.get("/:id", verifyToken, getSubCategory);
router.post("/create", verifyToken, createSubCategory);
router.post(
  "/update/:id",
  [registrationRules(), validateRegistration],
  updateSubCategory
);
router.delete("/delete/:id", verifyToken, deleteSubCategory);
router.delete("/delete", verifyToken, deleteSubCategories);
module.exports = router;
