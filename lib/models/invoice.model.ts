import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    no: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;
