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
  const { files } = await request.json();
  const userName = request.nextUrl.searchParams.get("user_name");
  const folder = `users/${userName}`;
  console.log(folder);
  const uploadedImages = await cloudinary.uploader.upload(files, {
    folder,
    format: "png",
  });
  return NextResponse.json({ uploadedImages });
}
