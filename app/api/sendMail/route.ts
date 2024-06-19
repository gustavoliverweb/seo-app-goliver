/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { EmailTemplate } from "@/app/components/emailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const selectedUser = formData.get("select_user") as string;
  const email = selectedUser ? selectedUser : (formData.get("email") as string);
  const subject = formData.get("subject") as string;
  const companyName = formData.get("company_name") as string;
  const companyUrl = formData.get("company_url") as string;
  const kitDigital = formData.get("kit_digital") as string;
  const subjectReport = `${subject} - ${companyName}`;

  try {
    const data = await resend.emails.send({
      from: "Gustavoliver.com <app@gustavoliver.com>",
      to: [email],
      subject: subjectReport,
      react: EmailTemplate({
        companyName: companyName,
        companyUrl: companyUrl,
        kitDigital: kitDigital,
      }),
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
