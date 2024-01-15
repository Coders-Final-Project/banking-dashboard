import { NextRequest, NextResponse } from "next/server";

import CompanyContract from "@/lib/models/company.contract.model";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import Card from "@/lib/models/card.model";
import Contractual from "@/lib/models/contractual.model";
import Notification from "@/lib/models/notification.model";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    connectToDB();

    const contractID = params.id;

    const contract = await CompanyContract.findByIdAndDelete(contractID);
    const userID = contract.userID;
    const contractRate = contract.rate;

    const contractRateForContractual = Number(contract.rate) + 50;

    const newContractual = new Contractual({
      userId: userID,
      company: contract.company,
      projectName: contract.projectName,
      rate: "-" + contractRateForContractual,
    });

    const user = await User.findById(userID);
    const card = await Card.find({ userID });

    card[0].balance = card[0].balance - (Number(contractRate) + 50);
    await user.companyContracts.pop(contractID);

    const newNotification = new Notification({
      userId: userID,
      key: contract.company,
      content: "Contract Deleted",
    });

    await user.save();
    await card[0].save();
    await newContractual.save();
    await newNotification.save();

    return NextResponse.json({
      message: "Contract deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
