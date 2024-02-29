import { NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });

    cookies().delete("token");

    response.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
