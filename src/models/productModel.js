const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
    },
    code: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Product code is required"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      large: { type: String },
      medium: { type: String },
      thumbnail: { type: String },
    },

    qty: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
