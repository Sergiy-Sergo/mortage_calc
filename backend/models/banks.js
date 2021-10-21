const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bankScheme = new Schema({
  bankName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  interestRate: {
    type: Number,
    required: true,
    min: 1,
  },
  maximumLoan: {
    type: Number,
    required: true,
  },
  minimumDownPayment: {
    type: Number,
    required: true,
    min: 1,
  },
  loanTerm: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Bank", bankScheme);
