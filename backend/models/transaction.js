const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    note: {
      type: String,
      trim: true,
    },

    // Dedicated marker to identify system-created opening balance entries.
    isOpeningBalance: {
      type: Boolean,
      default: false,
    },

    transaction_date: {
      type: Date,
      required: true,
    },

    linkedLoanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      index: true,
      default: null,
    },
  },
  {
    timestamps: true, // creates createdAt & updatedAt
  }
);
module.exports = mongoose.model("Transaction", transactionSchema);
