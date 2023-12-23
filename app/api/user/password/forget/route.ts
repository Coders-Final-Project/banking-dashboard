import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";

import bcrypt from "bcrypt";

import { connectToDB } from "@/lib/mongoose";

export async function POST(request: NextRequest) {
  connectToDB();

  try {
    const repBody = await request.json();

    const { email, password, confirmPassword } = repBody.formValues;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "User doesn't exist",
          success: false,
        },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Passwords don't match!",
          success: false,
        },
        { status: 400 },
      );
    }

    const userID = user._id.toString();

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        password: hashedNewPassword,
      },
      { new: true },
    );

    await updatedUser.save();

    return NextResponse.json(
      {
        message: "Password updated!",
        success: true,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
