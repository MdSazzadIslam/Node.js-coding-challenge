const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String, //varified
    },
    gateway: {
      type: String, //stripe
    },
    type: {
      type: String, //credit
    },
    amount: {
      type: Decimal,
    },
    card: {
      brand: { type: String }, //visa
      cardNo: { type: Number }, // 0898989898
      expirationMonth: { type: Number }, //09
      expirationYear: { type: Number }, //2030
      cvv: { type: Number }, //123
    },
  },
  { timestamps: true }
);
const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
