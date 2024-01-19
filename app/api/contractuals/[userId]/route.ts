import { NextRequest, NextResponse } from "next/server";

import Contractual from "@/lib/models/contractual.model";

import { connectToDB } from "@/lib/mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  connectToDB();

  const userId = params.userId;

  try {
    const contractuals = await Contractual.find({ userId }).sort("-createdAt");

    return NextResponse.json({
      contractuals,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
