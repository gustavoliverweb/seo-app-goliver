import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request: NextRequest) {
  const agency = request.nextUrl.searchParams.get("agency");
  console.log(agency);

  const { resources } = await cloudinary.search
    .expression(`folder:agency-client-${agency}/*`)
    .execute()
    .then((result) => result)
    .catch((err) => console.log(err));
  // console.log(resources);

  return Response.json({ message: "Data cloudinary", resources });
}
