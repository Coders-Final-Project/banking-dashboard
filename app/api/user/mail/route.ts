import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";

import { connectToDB } from "@/lib/mongoose";

export async function POST(request: NextRequest) {
  connectToDB();

  try {
    const repBody = await request.json();

    const userID = repBody.userID;

    const currentMail = await repBody.currentMail;
    const newMail = await repBody.newMail;

    const user = await User.findById(userID);

    if (!user) {
      return NextResponse.json({
        message: "User doesn't exist!",
        success: false,
        status: 400,
      });
    }

    if (user.email !== currentMail) {
      return NextResponse.json({
        message: "Invalid mail entered!",
        success: false,
        status: 400,
      });
    }

    const checkUser = await User.findOne({ email: newMail });

    if (checkUser) {
      return NextResponse.json({
        message: "Email already taken!",
        success: false,
        status: 404,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        email: newMail,
      },
      { new: true },
    );

    await updatedUser.save();

    return NextResponse.json({
      message: "Email changed successfully!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
