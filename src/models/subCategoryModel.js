const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
      required: [true, "Category is required"],
      unique: true,
    }, //Smart phones

    code: {
      type: String,
      unique: true,
    }, //sp-0001
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
module.exports = SubCategory;
