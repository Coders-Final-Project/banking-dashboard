import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import Notification from "@/lib/models/notification.model";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  connectToDB();

  const userID = params.userId;

  try {
    const notifications = await Notification.find({ userId: userID }).sort(
      "-createdAt",
    );

    return NextResponse.json({
      notifications,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
