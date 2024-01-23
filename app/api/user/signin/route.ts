import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";

import { connectToDB } from "@/lib/mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  connectToDB();

  try {
    const repBody = await request.json();

    const { email, password } = repBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User doesn't exist!", status: 400 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ message: "Invalid Password!", status: 400 });
    }

    const tokenData = {
      id: user._id,
      name: user.firstName,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    NextResponse.next();

    const response = NextResponse.json({
      message: "Login successful!",
      status: 200,
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
