import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";

import Notification from "@/lib/models/notification.model";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; notifyId: string } },
) {
  try {
    connectToDB();

    const notificationId = params.notifyId;
    const userID = params.userId;

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
