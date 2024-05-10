import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  const userName = request.nextUrl.searchParams.get("user_name");
  console.log("delete cloud", userName);
  try {
    const resources = await cloudinary.api.delete_resources_by_prefix(
      `users/${userName}`
    );
    console.log(resources);

    return Response.json({ message: "User cloud eliminado", resources });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Hubo un error al borrar el User cloud",
      error,
    });
  }
}
