import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: { type: String, required: true },
    userSurname: { type: String, required: true },
    cardNumber: { type: String, required: true },
    endDate: { type: String, required: true },
    securityCode: { type: String, required: true },
    balance: { type: Number, required: true },
  },
  { timestamps: true },
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
