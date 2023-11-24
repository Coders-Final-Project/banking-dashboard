import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";

import Card from "@/lib/models/card.model";

export async function POST(request: NextRequest) {
  try {
    connectToDB();

    const reqBody = await request.json();

    const userID = reqBody.userID;

    const card = await Card.findOne({ userID });

    if (!card) {
      return NextResponse.json(
        { message: "There is no card!" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      card,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}