"use strict";
const logger = require("../helpers/logger");
const Category = require("../models/categoryModel");

const getCategories = (req, res) => {
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
    Category.find({})
      .sort({ updatedAt: "desc" })
      .skip(Number(offset))
      .limit(Number(limit))
      .exec(),
    Category.countDocuments().exec(),
  ])
    .then((data) => {
      res
        .status(200)
        .json({ categories: data[0], count: data[1], page, limit });
    })
    .catch((err) => {
      logger.error(
        "[get/getCategories]Error occured while retriving all the records ",
        err.message
      );
      res.status(500).json({
        status: false,
        message: "Error occured while retriving all the records " + err.message,
      });
    });
};
const getCategory = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(`[get/getCategory/:id] invalid id expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: "invalid id expected string" });
  }

  Category.findById(id)
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
        "[get/getCategory/:id]Error occured while retriving the record ",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while retriving the record " + err.message,
      });
    });
};

const createCategory = (req, res) => {
  const category = new Category({
    name: req.body.name,
    code: req.body.code,
    userId: req.userId,
  });

  category
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
        "[post/createCategory]Error occured while saving the record",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while saving the record " + err.message,
      });
    });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    logger.error(`[put/updateCategory] invalid id expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: `invalid id expected string ${id}` });
  }

  Category.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        logger.error(
          "[put/updateCategory]Can not update the record with id" + `${id}}`,
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
        "[put/updateCategory]Error occured while updating the record",
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

const deleteCategory = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(
      `[delete/deleteCategory/:id] invalid id expected string ${id}`
    );
    return res
      .status(400)
      .send({ message: `invalid id expected string ${id}` });
  }

  Category.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        logger.error(
          `[delete/deleteCategory/:id] Can not delete the record with id ${id}`
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
        `[delete/deleteCategory/:id] Error occured while deleting the record with id ${id}`
      );
      res.status(500).json({
        status: "false",
        message:
          `Error occured while deleting the record with id ${id} ` +
          err.message,
      });
    });
};

const deleteCategories = (req, res) => {
  Category.deleteMany()
    .then((data) => {
      res.status(200).json({
        status: "true",
        message: `${data.deletedCount} records deleted successfully`,
      });
    })
    .catch((err) => {
      logger.error(
        "[delete/deleteCategories] Error occured while deleting all the records",
        err.message
      );

      res.status(500).json({
        status: "false",
        message: "Error occured while deleting all the records " + err.message,
      });
    });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
};
