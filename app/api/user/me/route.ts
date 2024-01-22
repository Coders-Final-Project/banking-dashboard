import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/lib/helpers/getDataFromToken";

import User from "@/lib/models/user.model";

import { connectToDB } from "@/lib/mongoose";

export async function GET(request: NextRequest) {
  connectToDB();

  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select(
      "firstName lastName street dateOfBirth phone country job citizenOf city zipCode insuranceCompleted uploadedFiles profileImg",
    );

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
