import { NextRequest, NextResponse } from "next/server";

import CompanyContract from "@/lib/models/company.contract.model";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import Card from "@/lib/models/card.model";

export async function POST(request: NextRequest) {
  try {
    connectToDB();

    const reqBody = await request.json();

    const contractID = reqBody.contractID;

    const contract = await CompanyContract.findByIdAndDelete(contractID);
    const userID = contract.userID;
    const contractRate = contract.rate;

    const user = await User.findById(userID);
    const card = await Card.find({ userID });

    card[0].balance = card[0].balance - (Number(contractRate) + 50);
    await user.companyContracts.pop(contractID);

    await user.save();
    await card[0].save();

    return NextResponse.json({
      message: "Contract deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
