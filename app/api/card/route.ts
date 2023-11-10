import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";

export async function POST(request: NextRequest) {
  connectToDB();

  try {
    const reqBody = await request.json();
    const userID = reqBody.userID;

    const { cardNumber, endDate, securityCode } = reqBody.cardValues;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
