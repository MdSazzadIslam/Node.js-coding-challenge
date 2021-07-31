"use strict";

const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { orderRules, validate } = require("../middlewares/validator");
const verifyToken = require("../middlewares/verifyToken");
// I am assuming that user is already logged in that's why I didn't appy verify token middleware in bellow routes execpt delete verb

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/create", [orderRules(), validate], createOrder);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", verifyToken, deleteOrder);

module.exports = router;
