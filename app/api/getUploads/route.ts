import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";

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
  const reportType = request.nextUrl.searchParams.get("type");
  // console.log(folderPath, reportType);
  const { resources } = await cloudinaryV2.api.resources({
    type: "upload",
    prefix: `report-${folderPath}/${reportType}`,
  });

  // console.log(resources);
  return Response.json({ message: "Data cloudinary", resources });
  // console.log("query", request.nextUrl.searchParams.get("report"));
  // const folderPath = request.nextUrl.searchParams.get("report");
  // const reportType = request.nextUrl.searchParams.get("type");
  // const { blobs } = await list({
  //   prefix: `${folderPath}/${reportType}`,
  // });
  // return Response.json(blobs);
}
