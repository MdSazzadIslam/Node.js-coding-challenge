"use strict";
const logger = require("../helpers/logger");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Discount = require("../models/discountModel");
const getOrders = (req, res) => {
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
    Order.find({})
      .sort({ updatedAt: "desc" })
      .skip(Number(offset))
      .limit(Number(limit))
      .exec(),
    Order.countDocuments().exec(),
  ])
    .then((data) => {
      res.status(200).json({ orders: data[0], count: data[1], page, limit });
    })
    .catch((err) => {
      logger.error(
        "[get/getOrders]Error occured while retriving all the records ",
        err.message
      );
      res.status(500).json({
        status: false,
        message: "Error occured while retriving all the records " + err.message,
      });
    });
};
const getOrder = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(`[get/getOrder/:id] invalid id expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: "invalid id expected string" });
  }

  Order.findById(id)
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
        "[get/getOrder/:id]Error occured while retriving the record ",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while retriving the record " + err.message,
      });
    });
};

const createOrder = (req, res) => {
  const { code, totalAmt } = req.body;
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  Product.findOne({ code: code }) //first, I am going to findout whethere the product exists or not
    .then((product) => {
      console.log(product);
      if (product != null) {
        // if exists then I am going to check that product has a discount or not

        Discount.findOne({
          //first step cheking the product has a discount between present date
          productId: product._id,
          $or: [{ startDate: today }, { endDate: today }],
        })
          .then((discount) => {
            console.log("First Step", discount, product._id, today);
            if (discount != null) {
              logger.error("[post/createOrder]product has a discount");
              return res
                .status(200)
                .json({ product: product, discount: discount });
            }

            Discount.findOne({
              //2nd step cheking the product has a discount by Subcategory [as per pdf it will be cat2] between present date
              subCategoryId: product.subCategoryId,
              $or: [{ startDate: today }, { endDate: today }],
            }).then((discount) => {
              console.log("2nd Step", discount, product.subCategoryId);
              if (discount != null) {
                logger.error("[post/createOrder]product has a discount");
                return res
                  .status(200)
                  .json({ product: product, discount: discount });
              }
              Discount.findOne({
                //3rd step cheking the product has a discount by Category [as per pdf it will be cat1] between present date
                categoryId: product.categoryId,
                $or: [{ startDate: today }, { endDate: today }],
              }).then((discount) => {
                console.log("3rd Step", discount, product.categoryId);
                if (discount != null) {
                  logger.error("[post/createOrder]product has a discount");
                  return res
                    .status(200)
                    .json({ product: product, discount: discount });
                }
                logger.error("[post/createOrder]Discount not found ");
                return res.status(500).json({
                  status: "false",
                  message: "Discount not found",
                  data: "-1",
                });
              });
            });
          })
          .catch((err) => {
            logger.error(
              "[post/createOrder]Product not found, please check product code " +
                err.message
            );
            return res.status(500).json({
              status: "false",
              message: "Product not found, please check product code ",
            });
          });
      } else {
        logger.error(
          "[post/createOrder]Product not found, please check product code"
        );
        return res.status(500).json({
          status: "false",
          message: "Product not found, please check product code ",
        });
      }
    })
    .catch((err) => {
      logger.error(
        "[post/createOrder]Error occured while saving the record",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while saving the record " + err.message,
      });
    });
};

const updateOrder = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    logger.error(`[put/updateOrder] invalid id expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: `invalid id expected string ${id}` });
  }

  Order.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        logger.error(
          "[put/updateOrder]Can not update the record with id" + `${id}}`,
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
        "[put/updateOrder]Error occured while updating the record",
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

const deleteOrder = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(`[delete/deleteOrder/:id] invalid id expected string ${id}`);
    return res
      .status(400)
      .send({ message: `invalid id expected string ${id}` });
  }

  Order.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        logger.error(
          `[delete/deleteOrder/:id] Can not delete the record with id ${id}`
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
        `[delete/deleteOrder/:id] Error occured while deleting the record with id ${id}`
      );
      res.status(500).json({
        status: "false",
        message:
          `Error occured while deleting the record with id ${id} ` +
          err.message,
      });
    });
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
