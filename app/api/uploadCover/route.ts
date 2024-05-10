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
  // console.log(files);
  const reportName = request.nextUrl.searchParams.get("report");
  const folder = `report-${reportName}/cover`;
  // console.log(folder);
  try {
    const uploadedImages = await cloudinary.uploader.upload(files, {
      folder,
      format: "png",
    });
    // console.log(uploadedImages);
    return NextResponse.json({ uploadedImages });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
