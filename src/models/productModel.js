const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    picture: {
      large: { type: String },
      medium: { type: String },
      thumbnail: { type: String },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
