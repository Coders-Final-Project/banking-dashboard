import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";

import Card from "@/lib/models/card.model";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    connectToDB();

    const userID = params.userId;

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
