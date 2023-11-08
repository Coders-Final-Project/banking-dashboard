import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";

import { connectToDB } from "@/lib/mongoose";

import bcrypt from "bcrypt";

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
    firstName,
    lastName,
    email,
    job,
    phone,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}