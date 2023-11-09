import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 30,
    },
    job: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    phone: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 30,
    },
    image: {
      type: String,
      default: "",
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    companyContracts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyContract",
      },
    ],
    clientContracts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientContract",
      },
    ],
    invoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
