/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { EmailPdfTemplate } from "@/app/components/emailPdfTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { content, email, subject, fileName, companyName } =
    await request.json();
  console.log(companyName);
  try {
    const data = await resend.emails.send({
      from: "Gustavoliver.com <app@gustavoliver.com>",
      to: [email],
      subject: subject,
      text: "report",
      react: EmailPdfTemplate({
        companyName: companyName,
      }),
      attachments: [
        {
          filename: fileName,
          content,
        },
      ],
    });
    console.log(data);
    if (data.error) {
      return NextResponse.json(
        { message: data.error.message },
        {
          status: data.error.statusCode,
        }
      );
    }
    return Response.json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Hubo un error al enviar el correo" },
      {
        status: 400,
      }
    );
  }
}
