const mongoose = require("mongoose");

const ORDER_STATUS = {
  PROCESSED: [0, "PROCESSED"],
  DELIVERED: [1, "DELIVERED"],
  SHIPPED: [2, "SHIPPED"],
  REJECTED: [3, "REJECTED"],
};

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    orderStatus: {
      type: Number,
      default: ORDER_STATUS[0],
    },

    totalAmt: {
      type: Number,
      default: 0,
      required: [true, "Amount is required"],
    },

    totalQty: {
      type: Number,
      default: 1, //Since user will input three filed product code , userId and final amount that's why defaul is one
      required: [true, "Quantity is required"],
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        code: {
          type: String,
          required: [true, "Product code is required"],
        },
        qty: {
          type: Number,
          default: 1, //Since user will input three filed product code , userId and final amount that's why defaul is one
          required: [true, "Quantity is required"],
        },
        price: {
          type: Number,
          default: 0,
          required: [true, "Price is required"],
        },
      },
    ],
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
