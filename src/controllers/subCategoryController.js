"use strict";
const logger = require("../helpers/logger");
const SubCategory = require("../models/subCategoryModel");

const getSubCategories = (req, res) => {
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
    SubCategory.find({})
      .sort({ updatedAt: "desc" })
      .skip(Number(offset))
      .limit(Number(limit))
      .exec(),
    SubCategory.countDocuments().exec(),
  ])
    .then((data) => {
      res.status(200).json({ products: data[0], count: data[1], page, limit });
    })
    .catch((err) => {
      logger.error(
        "[get/getSubCategories]Error occured while retriving all the records ",
        err.message
      );
      res.status(500).json({
        status: false,
        message: "Error occured while retriving all the records " + err.message,
      });
    });
};
const getSubCategory = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(`[get/getCategory/:id] invalid id expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: "invalid id expected string" });
  }

  SubCategory.findById(id)
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

const createSubCategory = (req, res) => {
  const { name } = req.body;
  SubCategory.findOne({ $or: [{ name: name }, { code: code }] })
    .then((data) => {
      if (data != null) {
        logger.error(
          `[post/createSubCategory]SubCategory already exists ${name} or ${code} `
        );
        return res.status(422).json({
          status: "false",
          message: `SubCategory: ${name} or ${code} is already taken`,
        });
      }

      const subCategory = new SubCategory({
        name: name,
        code: req.body.code,
        categoryId: req.body.categoryId,
        userId: req.userId,
      });

      subCategory
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
            "[post/createSubCategory]Error occured while saving the record",
            err.message
          );
          res.status(500).json({
            status: "false",
            message: "Error occured while saving the record " + err.message,
          });
        });
    })
    .catch((err) => {
      logger.error(
        "[post/createSubCategory]Error occured while saving the record",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while saving the record " + err.message,
      });
    });
};

const updateSubCategory = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    logger.error(
      `[put/updatupdateSubCategoryeCategory] invalid id expected string ${id}`
    );
    return res
      .status(400)
      .json({ status: "false", message: `invalid id expected string ${id}` });
  }

  SubCategory.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        logger.error(
          "[put/updateSubCategory]Can not update the record with id" + `${id}}`,
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
        "[put/updateSubCategory]Error occured while updating the record",
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

const deleteSubCategory = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(
      `[delete/deleteSubCategory/:id] invalid id expected string ${id}`
    );
    return res
      .status(400)
      .send({ message: `invalid id expected string ${id}` });
  }

  SubCategory.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        logger.error(
          `[delete/deleteSubCategory/:id] Can not delete the record with id ${id}`
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
        `[delete/deleteSubCategory/:id] Error occured while deleting the record with id ${id}`
      );
      res.status(500).json({
        status: "false",
        message:
          `Error occured while deleting the record with id ${id} ` +
          err.message,
      });
    });
};

const deleteSubCategories = (req, res) => {
  SubCategory.deleteMany()
    .then((data) => {
      res.status(200).json({
        status: "true",
        message: `${data.deletedCount} records deleted successfully`,
      });
    })
    .catch((err) => {
      logger.error(
        "[delete/deleteSubCategories] Error occured while deleting all the records",
        err.message
      );

      res.status(500).json({
        status: "false",
        message: "Error occured while deleting all the records " + err.message,
      });
    });
};

module.exports = {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteSubCategories,
};
