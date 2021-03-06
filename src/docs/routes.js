const registration = require("./user/registration");
const login = require("./user/login");
const getUsers = require("./user/getUsers");
const getUser = require("./user/getUser");
const deleteUser = require("./user/deleteUser");

const getCategories = require("./category/getCategories");
const getCategory = require("./category/getCategory");
const createCategory = require("./category/createCategory");
const updateCategory = require("./category/updateCategory");

const getSubCategories = require("./subCategory/getSubCategories");
const getSubCategory = require("./subCategory/getSubCategory");
const createSubCategory = require("./subCategory/createSubCategory");
const updateSubCategory = require("./subCategory/updateSubCategory");

const getProducts = require("./product/getProducts");
const getProduct = require("./product/getProduct");
const createProduct = require("./product/createProduct");
const updateProduct = require("./product/updateProduct");

const getDiscounts = require("./discount/getDiscounts");
const getDiscount = require("./discount/getDiscount");
const createDiscount = require("./discount/createDiscount");
const updateDiscount = require("./discount/updateDiscount");

const createOrder = require("./order/createOrder");

module.exports = {
  paths: {
    "/api/v1/ecom/user/login": {
      ...login,
    },
    "/api/v1/ecom/user/registration": {
      ...registration,
    },

    "/api/v1/ecom/user": {
      ...getUsers,
    },

    "/api/v1/ecom/user/{id}": {
      ...getUser,
    },

    "/api/v1/ecom/user/delete/{id}": {
      ...deleteUser,
    },

    "/api/v1/ecom/category": {
      ...getCategories,
    },
    "/api/v1/ecom/category/{id}": {
      ...getCategory,
    },
    "/api/v1/ecom/category/create": {
      ...createCategory,
    },
    "/api/v1/ecom/category/update/{id}": {
      ...updateCategory,
    },

    "/api/v1/ecom/subcategory": {
      ...getSubCategories,
    },
    "/api/v1/ecom/subcategory/{id}": {
      ...getSubCategory,
    },
    "/api/v1/ecom/subcategory/create": {
      ...createSubCategory,
    },
    "/api/v1/ecom/subcategory/update/{id}": {
      ...updateSubCategory,
    },

    "/api/v1/ecom/product": {
      ...getProducts,
    },
    "/api/v1/ecom/product/{id}": {
      ...getProduct,
    },
    "/api/v1/ecom/product/create": {
      ...createProduct,
    },
    "/api/v1/ecom/product/update/{id}": {
      ...updateProduct,
    },

    "/api/v1/ecom/discount": {
      ...getDiscounts,
    },
    "/api/v1/ecom/discount/{id}": {
      ...getDiscount,
    },
    "/api/v1/ecom/discount/create": {
      ...createDiscount,
    },
    "/api/v1/ecom/discount/update/{id}": {
      ...updateDiscount,
    },

    "/api/v1/ecom/order/create": {
      ...createOrder,
    },
  },
};
