import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  connectToDB();

  const userID = params.userId;

  try {
    const documents = await User.findOne({ _id: userID }).select(
      "uploadedFiles",
    );

    return NextResponse.json({
      documents,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
