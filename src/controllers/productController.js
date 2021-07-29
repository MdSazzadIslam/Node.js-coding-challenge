"use strict";
const logger = require("../helpers/logger");
const Product = require("../models/productModel");

const getProducts = (req, res) => {
  let limit = req.query.limit;
  let page = req.query.page;

  if (typeof limit !== "undefined") {
    limit = parseInt(limit);
  } else {
    limit = 20;
  }

  if (typeof page !== "undefined") {
    page = parseInt(page);
  } else {
    page = 1;
  }

  let offset = parseInt(page - 1) * parseInt(limit); // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0

  return Promise.all([
    Product.find({})
      .sort({ updatedAt: "desc" })
      .skip(Number(offset))
      .limit(Number(limit))
      .exec(),
    Product.countDocuments().exec(),
  ])
    .then((data) => {
      res.status(200).json({ products: data[0], count: data[1], page, limit });
    })
    .catch((err) => {
      logger.error(
        "[get/getProducts]Error occured while retriving all the records ",
        err.message
      );
      res.status(500).json({
        status: false,
        message: "Error occured while retriving all the records " + err.message,
      });
    });
};
const getProduct = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(`[get/getProduct/:id] invalid id expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: "invalid id expected string" });
  }

  Product.findById(id)
    .exec()
    .then((data) => {
      if (!data) {
        res.status(404).json({
          status: "false",
          message: `No record found for this id =${id} `,
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      logger.error(
        "[get/getProduct/:id]Error occured while retriving the record ",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while retriving the record " + err.message,
      });
    });
};

const createProduct = (req, res) => {
  const product = new Product({
    title: req.body.title,
    name: req.body.name,
    code: req.body.code,
    categoryId: req.body.categoryId,
    subCategoryId: req.body.subCategoryId,
    description: req.body.description,
    qty: req.body.qty,
    price: req.body.price,
    userId: req.userId,
  });

  product
    .save()
    .then((data) => {
      res.status(201).json({
        status: "true",
        message: "Record saved successfully",
        data: data,
      });
    })
    .catch((err) => {
      logger.error(
        "[post/createProduct]Error occured while saving the record",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while saving the record " + err.message,
      });
    });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    logger.error(`[put/updateProduct] invalid id expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: `invalid id expected string ${id}` });
  }

  Product.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        logger.error(
          "[put/updateProduct]Can not update the record with id" + `${id}}`,
          err.message
        );

        res.status(404).send({
          status: "false",
          message: `Can not update the record with id ${id}`,
        });
      } else {
        res
          .status(200)
          .json({ status: "true", message: "Record updated successfully" });
      }
    })
    .catch((err) => {
      logger.error(
        "[put/updateProduct]Error occured while updating the record",
        err.message
      );

      res.status(500).json({
        status: "false",
        message:
          `Error occured while updating the record with id ${id} ` +
          err.message,
      });
    });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(`[delete/deleteProduct/:id] invalid id expected string ${id}`);
    return res
      .status(400)
      .send({ message: `invalid id expected string ${id}` });
  }

  Product.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        logger.error(
          `[delete/deleteProduct/:id] Can not delete the record with id ${id}`
        );

        res.status(404).json({
          status: "false",
          message: `Can not delete the record with id ${id}`,
        });
      } else {
        res
          .status(200)
          .json({ status: "true", message: "Data deleted successfully" });
      }
    })
    .catch((err) => {
      logger.error(
        `[delete/deleteProduct/:id] Error occured while deleting the record with id ${id}`
      );
      res.status(500).json({
        status: "false",
        message:
          `Error occured while deleting the record with id ${id} ` +
          err.message,
      });
    });
};

const deleteProducts = (req, res) => {
  Product.deleteMany()
    .then((data) => {
      res.status(200).json({
        status: "true",
        message: `${data.deletedCount} records deleted successfully`,
      });
    })
    .catch((err) => {
      logger.error(
        "[delete/deleteProducts] Error occured while deleting all the records",
        err.message
      );

      res.status(500).json({
        status: "false",
        message: "Error occured while deleting all the records " + err.message,
      });
    });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
};
