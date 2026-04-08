const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    personName: {
      type: String,
      required: true,
      trim: true,
    },

    // legacy (kept for backward compatibility)
    type: {
      type: String,
      enum: ["GIVEN", "TAKEN"],
      required: true,
    },

    // new (preferred)
    loanType: {
      type: String,
      enum: ["taken", "given"],
      index: true,
    },

    // legacy (kept)
    principalAmount: { type: Number, required: true, min: 1 },

    // new (preferred)
    amount: { type: Number, min: 0 },

    // legacy (kept)
    outstandingAmount: { type: Number, required: true, min: 0 },

    // new (preferred)
    remainingAmount: { type: Number, min: 0 },
    totalInterestAccrued: { type: Number, default: 0, min: 0 },
    lastInterestAppliedDate: { type: Date },
    durationMonths: { type: Number, default: 12, min: 1 },
    dueDate: { type: Date },

    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    // monthly % interest rate
    interestRate: { type: Number, default: 0, min: 0 },

    // legacy (kept)
    status: { type: String, enum: ["ACTIVE", "CLOSED"], default: "ACTIVE" },

    // new (preferred)
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

loanSchema.pre("validate", function syncLegacyFields() {
  // Ensure new fields are always set from legacy, if missing
  if (this.amount === undefined || this.amount === null) {
    this.amount = this.principalAmount;
  }
  if (this.remainingAmount === undefined || this.remainingAmount === null) {
    this.remainingAmount = this.outstandingAmount;
  }
  if (!this.lastInterestAppliedDate) {
    this.lastInterestAppliedDate = this.startDate;
  }
  if (!this.loanType) {
    this.loanType = this.type === "TAKEN" ? "taken" : "given";
  }

  // Ensure legacy mirrors new fields (best-effort)
  this.principalAmount = this.amount ?? this.principalAmount;
  this.outstandingAmount = this.remainingAmount ?? this.outstandingAmount;
  this.type = this.loanType === "taken" ? "TAKEN" : "GIVEN";

  if (this.paymentStatus === "paid" || this.status === "CLOSED") {
    this.paymentStatus = "paid";
    this.status = "CLOSED";
    this.remainingAmount = 0;
    this.outstandingAmount = 0;
  }
});

module.exports = mongoose.model("Loan", loanSchema);

/*
const Loan = require("../models/Loan");
const Account = require("../models/Account");

router.post("/", userAuth, async (req, res) => {
  try {
    const {
      personName,
      type,
      principalAmount,
      accountId,
      startDate,
      interestRate,
    } = req.body;

    // validate account ownership
    const account = await Account.findOne({
      _id: accountId,
      userId: req.userId,
    });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // update balance
    if (type === "GIVEN") {
      if (account.balance < principalAmount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      account.balance -= principalAmount;
    } else {
      account.balance += principalAmount;
    }

    await account.save();

    const loan = await Loan.create({
      userId: req.userId,
      personName,
      type,
      principalAmount,
      outstandingAmount: principalAmount,
      accountId,
      startDate,
      interestRate,
    });

    res.status(201).json({ message: "Loan created", loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

*/
