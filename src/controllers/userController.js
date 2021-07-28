"use strict";
const logger = require("../helpers/logger");
const User = require("../models/userMode");
require("dotenv").config();

const getUsers = (req, res) => {
  let limit = req.query.limit;
  let page = req.query.limit;
  //let age = Math.max(0, req.query.age);
  if (typeof limit !== "undefined") {
    limit = parseInt(req.query.limit);
  } else {
    limit = 20;
  }

  if (typeof page !== "undefined") {
    page = parseInt(req.query.page);
  } else {
    page = 1;
  }

  let offset = parseInt(req.query.page - 1) * parseInt(req.query.limit); // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0

  User.find({})
    .sort({ updatedAt: "desc" })
    .skip(Number(offset))
    .limit(Number(limit))
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      logger.error(
        "[get/getUsers]Error occured while retriving all the records",
        err.message
      );
      res.status(500).json({
        status: false,
        message: "Error occured while retriving all the records" + err.message,
      });
    });
};
const getUser = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(`[get/getUser/:id] invalid 'text' expected string ${id}`);
    return res
      .status(400)
      .json({ status: "false", message: "invalid 'text' expected string" });
  }

  User.findById({ id })
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
        "[get/getUser/:id]Error occured while retriving the record",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while retriving the record" + err.message,
      });
    });
};

const login = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  user
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
        "[post/createUser]Error occured while saving the record",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while saving the record" + err.message,
      });
    });
};

const registration = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data != null) {
        logger.error(
          `[post/registration]Error occured while registration ${req.body.email}`
        );

        res.status(403).json({
          status: "false",
          message: `Email: ${req.body.email} is already taken`,
        });
      } else {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        });

        user
          .save()
          .then((data) => {
            res.status(201).json({
              status: "true",
              message: "Registration successfull",
              data: data,
            });
          })
          .catch((err) => {
            logger.error(
              "[post/registration]Error occured while registration",
              err.message
            );
            res.status(500).json({
              status: "false",
              message: "Error occured while saving the record" + err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "false",
        message: "Error occured while registration" + err.message,
      });
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    logger.error(`[delete/deleteUser/:id] invalid id expected string ${id}`);
    return res
      .status(400)
      .send({ message: `invalid id expected string ${id}` });
  }

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        logger.error(
          `[delete/deleteUser/:id] Can not delete the record with id ${id}`
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
        `[delete/deleteUser/:id] Error occured while deleting the record with id ${id}`
      );
      res.status(500).json({
        status: "false",
        message:
          `Error occured while deleting the record with id ${id} ` +
          err.message,
      });
    });
};

const deleteUsers = (req, res) => {
  User.deleteMany()
    .then((data) => {
      res.status(200).json({
        status: "true",
        message: `${data.deletedCount} records deleted successfully`,
      });
    })
    .catch((err) => {
      logger.error(
        "[delete/deleteUsers] Error occured while deleting all the records",
        err.message
      );

      res.status(500).json({
        status: "false",
        message: "Error occured while deleting all the records " + err.message,
      });
    });
};

module.exports = {
  getUsers,
  getUser,
  login,
  registration,
  deleteUser,
  deleteUsers,
};
