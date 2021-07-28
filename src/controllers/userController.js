"use strict";
const logger = require("../helpers/logger");
const User = require("../models/userMode");
const bcrypt = require("bcrypt");
const generateToken = require("../helpers/generateToken");
require("dotenv").config();

const getUsers = (req, res) => {
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
    User.find({})
      .sort({ updatedAt: "desc" })
      .skip(Number(offset))
      .limit(Number(limit))
      .exec(),
    User.countDocuments().exec(),
  ])
    .then((data) => {
      res.status(200).json({ users: data[0], count: data[1], page, limit });
    })
    .catch((err) => {
      logger.error(
        "[get/getUsers]Error occured while retriving all the records ",
        err.message
      );
      res.status(500).json({
        status: false,
        message: "Error occured while retriving all the records " + err.message,
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

  User.findById(id)
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
        "[get/getUser/:id]Error occured while retriving the record ",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while retriving the record " + err.message,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        logger.error(`[post/login]Invalid email  ${email}`);
        return res.status(422).json({
          status: "false",
          message: "Invalid email",
        });
      }
      bcrypt
        .compare(password, user.password) //comparing password
        .then((doMatch) => {
          if (doMatch) {
            const token = generateToken(user._id, user.email); //generating token
            if (token) {
              return res.status(200).json({
                success: "true",
                msg: "Login successfull",
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                varified: user.varified,
                token: token,
              });
            }
          }
          logger.error(`[post/login]Invalid email or password ${email}`);
          return res.status(422).json({
            status: "false",
            message: "Invalid email or password",
          });
        })
        .catch((err) => {
          logger.error("[post/login]Error occured while login ", err.message);
          return res.status(500).json({
            status: "false",
            message: "Error occured while login " + err.message,
          });
        });
    })
    .catch((err) => {
      logger.error("[post/login]Error occured while login ", err.message);
      res.status(500).json({
        status: "false",
        message: "Error occured while login " + err.message,
      });
    });
};

const registration = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email: email })
    .then((data) => {
      if (data != null) {
        logger.error(
          `[post/registration]Error occured while registration ${email}`
        );

        return res.status(403).json({
          status: "false",
          message: `Email: ${email} is already taken`,
        });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        //hashing password
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: email,
          password: hashedPassword,
        });

        user
          .save()
          .then((data) => {
            return res.status(201).json({
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
            return res.status(500).json({
              status: "false",
              message: "Error occured while saving the record " + err.message,
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "false",
        message: "Error occured while registration " + err.message,
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
