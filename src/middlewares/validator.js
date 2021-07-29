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

const productRules = () => {
  return [
    check("title", "Title is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("code", "Code is required").not().isEmpty().isEmail(),
    check("categoryId", "CategoryId is required").not().isEmpty(),
    check("subCategoryId", "SubCategoryId is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("qty", "Qty is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
  ];
};

const validateRegistration = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    logger.error("Middleware[registration]", messages);
    return res.status(500).send({ message: messages });
  }
  next();
};

const validateProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    logger.error("Middleware[registration]", messages);
    return res.status(500).send({ message: messages });
  }
  next();
};

module.exports = {
  registrationRules,
  validateRegistration,
  productRules,
  validateProduct,
};
