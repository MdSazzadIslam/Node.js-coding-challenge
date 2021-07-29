"use strict";

const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  login,
  registration,
  deleteUser,
  deleteUsers,
} = require("../controllers/userController");
const {
  registrationRules,
  loginRules,
  validate,
} = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.post("/login", [loginRules(), validate], login);
router.post("/registration", [registrationRules(), validate], registration);
router.delete("/delete/:id", verifyToken, deleteUser);
router.delete("/delete", verifyToken, deleteUsers);
module.exports = router;
