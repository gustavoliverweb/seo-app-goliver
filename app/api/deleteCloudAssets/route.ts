import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  const folderPath = request.nextUrl.searchParams.get("report");
  const reportType = request.nextUrl.searchParams.get("type");

  try {
    const resources = await cloudinary.api.delete_resources_by_prefix(
      `report-${folderPath}/${reportType}`
    );
    console.log(resources);
    return NextResponse.json({ message: "Delete assets", resources });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error });
  }
}
