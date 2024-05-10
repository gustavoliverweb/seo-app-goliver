/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const token = formData.get("token") as string;
  console.log(token);
  const newPassword = formData.get("password-reset") as string;
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await sql`
    UPDATE users_go SET password = ${hashedPassword} WHERE email = ${decoded.email}
    `;
    console.log("Password updated");
    return NextResponse.json(
      {
        message: "La nueva contraseña fue establecida con éxito.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return NextResponse.json({ message: "Token expirado" }, { status: 498 });
    }
    return NextResponse.json({ message: error });
  }
}
