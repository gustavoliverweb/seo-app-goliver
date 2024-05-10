import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// cloudinaryV2.api.resources({
//   type: "upload",
//   prefix: "SegurMaraver", // add your folder
// });

export async function GET(request: NextRequest) {
  const folderPath = request.nextUrl.searchParams.get("report");
  // console.log(folderPath);
  // const { resources } = await cloudinaryV2.api.resources({
  //   type: "upload",
  //   prefix: `${folderPath}`,
  // });
  const { resources } = await cloudinary.search
    .expression(`folder:report-${folderPath}/*`)
    .execute()
    .then((result) => result)
    .catch((err) => console.log(err));
  // console.log(resources);

  return Response.json({ message: "Data cloudinary", resources });
}
