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
    profileImg: {
      fileUrl: {
        public_id: String,
        secure_url: String,
      },
    },
    insuranceCompleted: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: Date,
    },
    citizenOf: {
      type: String,
      default: "Azerbaijan",
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    country: {
      type: String,
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
    uploadedFiles: [
      {
        fileName: {
          type: String,
        },
        fileUrl: {
          public_id: String,
          secure_url: String,
        },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
