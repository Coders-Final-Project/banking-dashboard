import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();

  const userID = reqBody.userID;

  try {
    const customers = await User.find({ _id: { $ne: userID } })
      .select("firstName lastName job profileImg")
      .sort("-createdAt");

    return NextResponse.json({
      customers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
