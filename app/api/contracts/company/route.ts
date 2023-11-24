import { NextRequest, NextResponse } from "next/server";

import CompanyContract from "@/lib/models/company.contract.model";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import Card from "@/lib/models/card.model";
import Contractual from "@/lib/models/contractual.model";

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

  if (Number(rate) > 1000) {
    return NextResponse.json(
      { message: "Max allowed rate is 1000₼" },
      { status: 500 },
    );
  }

  const newContractual = new Contractual({
    userId: userID,
    company,
    projectName,
    rate,
  });

  try {
    const savedContract = await newContract.save();

    const user = await User.findById(userID);
    const card = await Card.find({ userID });

    await user.companyContracts.push(savedContract._id);
    card[0].balance = card[0].balance + Number(rate);

    await user.save();
    await card[0].save();
    await newContractual.save();

    return NextResponse.json({
      message: "Company contract created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
