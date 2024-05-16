/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { EmailRecoverPasswordTemplate } from "@/app/components/emailRecoverPasswordTemplate";

const secretKey = process.env.JWT_SECRET;
console.log(secretKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  console.log(sql);
  const user = await sql`
  SELECT * FROM users_go WHERE email = ${email}
  `;
  console.log(user);
  if (user.rows.length === 0) {
    return NextResponse.json(
      { message: `El correo ${email}, no existe en nuestra base de datos.` },
      { status: 404 }
    );
  }
  try {
    const resetToken = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
    const url = `https://app.gustavoliver.com/reset-password/${resetToken}`;
    console.log(resetToken);
    const data = await resend.emails.send({
      from: "Gustavoliver.com <app@gustavoliver.com>",
      to: [email],
      subject: "Recuperación de contraseña",
      react: EmailRecoverPasswordTemplate({ url }),
    });
    console.log(data);
    return NextResponse.json(
      {
        message:
          "Correo enviado con éxito, por favor revise su bandeja de entrada.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
    });
  }
}
