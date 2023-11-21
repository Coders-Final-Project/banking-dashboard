import mongoose from "mongoose";

const contractualSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Contractual =
  mongoose.models.Contractual ||
  mongoose.model("Contractual", contractualSchema);

export default Contractual;
