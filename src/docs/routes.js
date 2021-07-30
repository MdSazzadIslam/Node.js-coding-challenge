const registration = require("./user/registration");
const login = require("./user/login");
const getUsers = require("./user/getUsers");
const getUser = require("./user/getUser");
const getCategories = require("./category/getCategories");
const createCategory = require("./category/createCategory");
const updateCategory = require("./category/updateCategory");

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
    "/api/v1/ecom/category/create": {
      ...createCategory,
    },

    "/api/v1/ecom/category": {
      ...getCategories,
    },
    "/api/v1/ecom/category/update/{id}": {
      ...updateCategory,
    },
  },
};
