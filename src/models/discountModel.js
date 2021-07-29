const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
  {
    discount: {
      type: Decimal,
      required: [true, "Discount percentage is required"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductId",
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", DiscountSchema);
module.exports = Discount;
