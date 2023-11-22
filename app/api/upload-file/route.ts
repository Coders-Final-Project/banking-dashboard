import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";

import User from "@/lib/models/user.model";

export async function POST(request: NextRequest) {
  connectToDB();

  try {
    const reqBody = await request.json();
    const { userID, fileName, fileUrl } = reqBody;

    console.log({ userID, fileName, fileUrl });

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $push: {
          uploadedFiles: { fileName, fileUrl },
        },
      },
      { new: true },
    );

    console.log(updatedUser);

    return NextResponse.json({
      message: "File uploaded successfully",
      success: true,
      updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
