import { NextResponse, NextRequest } from "next/server";

import { connectToDB } from "@/lib/mongoose";

import User from "@/lib/models/user.model";
import Invoice from "@/lib/models/invoice.model";

export async function POST(request: NextRequest) {
  connectToDB();

  try {
    const reqBody = await request.json();

    console.log(reqBody);

    return NextResponse.json({ message: "Invoice created!", status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
