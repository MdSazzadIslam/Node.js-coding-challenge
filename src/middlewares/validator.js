"use strict";
const { check, validationResult } = require("express-validator");
const logger = require("../helpers/logger");
const registrationRules = () => {
  return [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty().isEmail(),
    check("password", "password is required").not().isEmpty(),
  ];
};

const loginRules = () => {
  return [
    check("email", "Email is required").not().isEmpty().isEmail(),
    check("password", "password is required").not().isEmpty(),
  ];
};

const categoryRules = () => {
  return [
    check("name", "Name is required").not().isEmpty(),
    check("code", "Code is required").not().isEmpty(),
  ];
};

const subcategoryRules = () => {
  return [
    check("name", "Name is required").not().isEmpty(),
    check("code", "Code is required").not().isEmpty(),
    check("categoryId", "CategoryId is required").not().isEmpty(),
  ];
};

const productRules = () => {
  return [
    check("title", "Title is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("code", "Code is required").not().isEmpty(),
    check("categoryId", "CategoryId is required").not().isEmpty(),
    check("subCategoryId", "SubCategoryId is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("qty", "Qty is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
  ];
};

const discountRules = () => {
  return [
    check("discount", "Discount is required").not().isEmpty(),
    check("startDate", "Start date is required").not().isEmpty(),
    check("endDate", "End date is required").not().isEmpty(),
  ];
};

const orderRules = () => {
  return [
    check("code", "Product code is required").not().isEmpty(),
    check("totalAmt", "Amount is required").not().isEmpty(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    logger.error("Middleware Error", messages);
    return res.status(500).send({ message: messages });
  }
  next();
};

module.exports = {
  loginRules,
  registrationRules,
  categoryRules,
  subcategoryRules,
  productRules,
  discountRules,
  validate,
  orderRules,
};
