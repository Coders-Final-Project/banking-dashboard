import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import Card from "@/lib/models/card.model";
import Notification from "@/lib/models/notification.model";

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();

  const userID = reqBody.userID;

  try {
    const user = await User.findById(userID);
    const card = await Card.find({ userID });

    if (card[0].balance < 100) {
      return NextResponse.json({
        message: "There is no enough balance!",
        status: 400,
      });
    }

    user.insuranceCompleted = true;
    card[0].balance = card[0].balance - 100;

    await user.save();
    await card[0].save();

    const newNotification = new Notification({
      userId: userID,
      key: "gerki",
      content: "Insurance Completed",
    });

    await newNotification.save();

    return NextResponse.json({
      message: "Insurance created successfully",
      success: true,
      data: user.insuranceCompleted,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
