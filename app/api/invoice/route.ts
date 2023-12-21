import { NextResponse, NextRequest } from "next/server";

import { connectToDB } from "@/lib/mongoose";

import User from "@/lib/models/user.model";
import Invoice from "@/lib/models/invoice.model";
import Card from "@/lib/models/card.model";
import Notification from "@/lib/models/notification.model";
import CompanyContract from "@/lib/models/company.contract.model";

import { generateRandomStringNumberPair } from "@/lib/helpers/generateInvoicePair";

export async function POST(request: NextRequest) {
  connectToDB();

  try {
    const reqBody = await request.json();

    const senderID = reqBody.userID;

    const { email, pname, date, dueon } = reqBody.receiverData;

    //item,rate,hours,total - work in this for future
    const items = reqBody.itemData;

    const receiver = await User.find({ email });
    const sender = await User.findById(senderID);

    if (sender.email === email) {
      return NextResponse.json({ message: "Invalid operation!", status: 400 });
    }

    if (receiver.length === 0) {
      return NextResponse.json({ message: "User not found!", status: 400 });
    }

    const receiverID = receiver[0]._id.toString();
    const client = receiver[0].firstName + " " + receiver[0].lastName;

    const senderCard = await Card.find({ senderID });
    const receiverCard = await Card.find({ receiverID });

    if (!senderCard && !receiverCard) {
      return NextResponse.json({ message: "Card not found!", status: 400 });
    }

    const contracts = await CompanyContract.find({ receiverID });

    const contractSet = new Set();

    contracts.forEach((contract) => {
      contractSet.add(contract.projectName);
    });

    if (!contractSet.has(pname)) {
      return NextResponse.json({ message: "Project not found!", status: 400 });
    }

    const totalAmount = items.reduce((count: number, item: any) => {
      return Number(item.total) + count;
    }, 0);

    senderCard[0].balance = senderCard[0].balance - parseFloat(totalAmount);
    receiverCard[0].balance = receiverCard[0].balance + parseFloat(totalAmount);

    const randomPair = generateRandomStringNumberPair();

    const newInvoice = new Invoice({
      userId: senderID,
      no: randomPair,
      client,
      amount: totalAmount,
      status: "pending",
    });

    const newNotification = new Notification({
      userId: senderID,
      key: "invoice",
      content: `Invoice Sent to ${receiver[0].firstName}`,
    });

    await senderCard[0].save();
    await receiverCard[0].save();
    await newInvoice.save();
    await newNotification.save();

    return NextResponse.json({ message: "Invoice created!", status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
