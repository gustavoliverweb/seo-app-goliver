import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  const { content } = await request.json();
  // console.log(content);
  const pdf = `data:application/pdf;base64,${content}`;
  try {
    const uploadedPdf = await cloudinary.uploader.upload(pdf, {
      folder: "test-pdf-mail",
    });
    console.log(uploadedPdf);

    return NextResponse.json({ uploadedPdf });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
