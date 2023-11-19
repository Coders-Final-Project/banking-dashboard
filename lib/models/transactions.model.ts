import mongoose, { Schema } from "mongoose";

const transactionsSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverName: {
      type: String,
    },
    receiverSurname: {
      type: String,
    },
    receiverJob: {
      type: String,
    },
    amount: {
      type: String,
    },
  },
  { timestamps: true },
);

const Transactions =
  mongoose.models.Transactions ||
  mongoose.model("Transactions", transactionsSchema);

export default Transactions;
