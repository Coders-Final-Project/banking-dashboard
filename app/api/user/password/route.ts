import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";

import bcrypt from "bcrypt";

import { connectToDB } from "@/lib/mongoose";

export async function POST(request: NextRequest) {
  connectToDB();

  try {
    const repBody = await request.json();

    const userID = repBody.userID;

    const currenctPass = await repBody.currentPass;
    const newPass = await repBody.newPass;

    const user = await User.findById(userID);

    if (!user) {
      return NextResponse.json({
        message: "User doesn't exist",
        success: false,
        status: 400,
      });
    }

    const validPassword = await bcrypt.compare(currenctPass, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid Password!", success: false },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPass, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        password: hashedNewPassword,
      },
      { new: true },
    );

    await updatedUser.save();

    return NextResponse.json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
