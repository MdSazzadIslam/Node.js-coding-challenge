const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
      lowercase: true,
    },

    password: { type: String, required: [true, "Password is required"] },
    picture: {
      type: String,
    },
    address: {
      street: {
        number: Number,
        name: String,
      },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postcode: { type: String },
    },

    varified: { type: Boolean, deafult: true }, //default is true for this demo project purpose
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
