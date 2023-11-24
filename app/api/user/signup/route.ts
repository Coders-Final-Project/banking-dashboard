import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";

import { connectToDB } from "@/lib/mongoose";

import bcrypt from "bcrypt";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();

  const { firstName, lastName, email, phone, password, job } = reqBody;

  const user = await User.findOne({ email });

  if (user) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 },
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    firstName: firstName.trim(),
    lastName: firstName.trim(),
    email,
    job: firstName.trim(),
    phone: firstName.trim(),
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { headers: corsHeaders },
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
