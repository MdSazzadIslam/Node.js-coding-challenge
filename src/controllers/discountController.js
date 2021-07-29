"use strict";
const logger = require("../helpers/logger");
const Discount = require("../models/discountModel");

const getDiscounts = (req, res) => {
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
    Discount.find({})
      .sort({ updatedAt: "desc" })
      .skip(Number(offset))
      .limit(Number(limit))
      .exec(),
    Discount.countDocuments().exec(),
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
const getDiscount = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(`[get/getCategory/:id] invalid id expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: "invalid id expected string" });
  }

  Discount.findById(id)
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

const createDiscount = (req, res) => {
  const { productId, categoryId, subCategoryId } = req.body;
  console.log(productId, categoryId, subCategoryId);
  if (
    typeof productId === undefined ||
    typeof categoryId === undefined ||
    typeof subCategoryId === undefined
  ) {
    logger.error(
      `[post/createDiscount] At least select one Product || Category || SubCategory`
    );
    return res.status(422).json({
      status: "false",
      message: "At least select Productid, CategoryId or SubCategoryId",
    });
  }

  const discount = new Discount({
    discount: req.body.discount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    productId: productId,
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    userId: req.userId,
  });

  discount
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

const updateDiscount = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    logger.error(`[put/updateDiscount] invalid id expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: `invalid id expected string ${id}` });
  }

  Discount.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        logger.error(
          "[put/updateDiscount]Can not update the record with id" + `${id}}`,
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
        "[put/updateDiscount]Error occured while updating the record",
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

const deleteDiscount = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(
      `[delete/deleteDiscount/:id] invalid id expected string ${id}`
    );
    return res
      .status(400)
      .send({ message: `invalid id expected string ${id}` });
  }

  Discount.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        logger.error(
          `[delete/deleteDiscount/:id] Can not delete the record with id ${id}`
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
        `[delete/deleteDiscount/:id] Error occured while deleting the record with id ${id}`
      );
      res.status(500).json({
        status: "false",
        message:
          `Error occured while deleting the record with id ${id} ` +
          err.message,
      });
    });
};

const deleteDiscounts = (req, res) => {
  Discount.deleteMany()
    .then((data) => {
      res.status(200).json({
        status: "true",
        message: `${data.deletedCount} records deleted successfully`,
      });
    })
    .catch((err) => {
      logger.error(
        "[delete/deleteDiscounts] Error occured while deleting all the records",
        err.message
      );

      res.status(500).json({
        status: "false",
        message: "Error occured while deleting all the records " + err.message,
      });
    });
};

module.exports = {
  getDiscounts,
  getDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  deleteDiscounts,
};
