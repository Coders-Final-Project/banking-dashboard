import { NextRequest, NextResponse } from "next/server";

import Contractual from "@/lib/models/contractual.model";

import { connectToDB } from "@/lib/mongoose";

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();

  const userId = reqBody.userID;

  try {
    const contractuals = await Contractual.find({ userId });

    return NextResponse.json({
      contractuals,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
