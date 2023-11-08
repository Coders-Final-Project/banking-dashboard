import mongoose from "mongoose";

const companyContractSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: String,
      required: [true, "Please, provide client name"],
      min: 5,
      max: 20,
    },
    company: {
      type: String,
      required: [true, "Please, provide company name"],
    },
    rate: {
      type: String,
      required: [true, "Please, provide fixed rate"],
    },
    projectName: {
      type: String,
      required: [true, "Please, provide project name"],
      min: 5,
      max: 20,
    },
    currency: {
      type: String,
      required: [true, "Please, provide currency"],
    },
    date: {
      type: String,
      required: [true, "Please, provide date"],
    },
    workScope: {
      type: String,
      required: [true, "Please, provide work scope"],
    },
    cycleEnd: {
      type: String,
      required: [true, "Please, provide the end of the cycle"],
    },
    paymentDue: {
      type: String,
      required: [true, "Please, provide payment due"],
    },
    isSigned: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

const CompanyContract =
  mongoose.models.CompanyContract ||
  mongoose.model("CompanyContract", companyContractSchema);

export default CompanyContract;
