import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";

import { connectToDB } from "@/lib/mongoose";

export async function POST(request: NextRequest) {
  connectToDB();

  try {
    const reqBody = await request.json();

    const userID = reqBody.userID;

    const user = await User.findById(userID);

    const { dateOfBirth, phone, street, city, zipCode, country } =
      reqBody.userValues;

    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exist!", success: false },
        { status: 400 },
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $set: {
          dateOfBirth,
          phone,
          street,
          city,
          zipCode,
          country,
        },
      },
      { new: true },
    );

    await updatedUser.save();

    return NextResponse.json({
      message: "Profile updated successfully!",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
