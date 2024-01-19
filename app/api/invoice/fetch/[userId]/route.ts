import { NextRequest, NextResponse } from "next/server";

import Invoice from "@/lib/models/invoice.model";

import { connectToDB } from "@/lib/mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  connectToDB();

  const userID = params.userId;

  try {
    const invoices = await Invoice.find({ userId: userID }).sort("-createdAt");

    return NextResponse.json({
      invoices,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
