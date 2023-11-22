import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";

import Card from "@/lib/models/card.model";
import User from "@/lib/models/user.model";

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();
  const userID = reqBody.userID;

  const { cardNumber, endDate, securityCode } = reqBody.cardValues;

  const user = await User.findById(userID);
  const checkCard = await Card.findOne({ cardNumber });

  if (checkCard) {
    return NextResponse.json(
      { message: "Card number already taken!" },
      { status: 500 },
    );
  }

  const newCard = new Card({
    userID,
    userName: user.firstName,
    userSurname: user.lastName,
    cardNumber,
    endDate,
    securityCode,
    balance: 5000,
  });

  try {
    const savedCard = await newCard.save();

    await user.cards.push(savedCard._id);
    await user.save();

    return NextResponse.json({
      message: "Card created successfully",
      success: true,
      savedCard,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
