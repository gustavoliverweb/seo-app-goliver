import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  const folderPath = request.nextUrl.searchParams.get("report");
  console.log("delete cloud", folderPath);
  try {
    const resources = await cloudinary.api.delete_resources_by_prefix(
      `report-${folderPath}`
    );
    console.log(resources);

    return Response.json({ message: "Reporte cloud eliminado", resources });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Hubo un error al borrar el reporte cloud",
      error,
    });
  }
}
