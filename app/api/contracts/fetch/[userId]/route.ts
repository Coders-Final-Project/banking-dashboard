import { NextRequest, NextResponse } from "next/server";

import CompanyContract from "@/lib/models/company.contract.model";

import { connectToDB } from "@/lib/mongoose";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  connectToDB();

  const userID = params.userId;

  try {
    const contracts = await CompanyContract.find({ userID }).sort("-createdAt");

    return NextResponse.json({
      contracts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
