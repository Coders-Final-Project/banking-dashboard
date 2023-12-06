import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";

import Notification from "@/lib/models/notification.model";

export async function POST(request: NextRequest) {
  try {
    connectToDB();

    const reqBody = await request.json();

    const notificationId = reqBody.notificationId;
    const userID = reqBody.userID;

    await Notification.findByIdAndDelete(notificationId);

    const notifications = await Notification.find({ userId: userID }).sort(
      "-createdAt",
    );

    return NextResponse.json({
      message: "Notification deleted!",
      notifications,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
