import { NextRequest, NextResponse } from "next/server";

import Transactions from "@/lib/models/transactions.model";
import User from "@/lib/models/user.model";

import { connectToDB } from "@/lib/mongoose";

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();

  const userID = reqBody.userID;

  try {
    const transactions = await Transactions.find({ senderId: userID }).sort(
      "-createdAt",
    );

    const transactionsWithProfileImg = await Promise.all(
      transactions.map(async (transaction) => {
        const receiverUser = await User.findOne({
          _id: transaction.receiverId,
        });
        const profileImg = receiverUser ? receiverUser.profileImg : null;

        return {
          ...transaction.toObject(),
          profileImg,
        };
      }),
    );

    return NextResponse.json({
      transactions: transactionsWithProfileImg,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
