import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import Notification from "@/lib/models/notification.model";

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();

  const userID = reqBody.userID;

  try {
    const notification = await Notification.find({ userId: userID }).sort(
      "-createdAt",
    );

    return NextResponse.json({
      notification,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
