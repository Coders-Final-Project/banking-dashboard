import { NextRequest, NextResponse } from "next/server";

import CompanyContract from "@/lib/models/company.contract.model";

import { connectToDB } from "@/lib/mongoose";

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();

  const userID = reqBody.userID;

  try {
    const contracts = await CompanyContract.find({ userID }).sort("-createdAt");

    return NextResponse.json({
      contracts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
