const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
  {
    discount: {
      type: Number,
      required: [true, "Discount percentage is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
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

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", DiscountSchema);
module.exports = Discount;
