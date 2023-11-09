import { NextRequest, NextResponse } from "next/server";

import CompanyContract from "@/lib/models/company.contract.model";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();

  const userID = reqBody.userID;

  const {
    client,
    company,
    rate,
    projectName,
    currency,
    date,
    workScope,
    cycleEnd,
    paymentDue,
    isSigned,
  } = reqBody.data;

  const newContract = new CompanyContract({
    client,
    company,
    rate,
    projectName,
    currency,
    date,
    workScope,
    cycleEnd,
    paymentDue,
    isSigned,
    userID,
  });

  try {
    const savedContract = await newContract.save();

    const user = await User.findById(userID);
    await user.companyContracts.push(savedContract._id);
    await user.save();

    return NextResponse.json({
      message: "Company contract created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
