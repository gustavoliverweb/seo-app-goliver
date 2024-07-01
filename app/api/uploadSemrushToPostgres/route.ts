import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const normalizedData = JSON.stringify(data.images);
  const reportId = request.nextUrl.searchParams.get("reportId");
  console.log(reportId);
  try {
    const data = await sql.query(
      `
      UPDATE
        reports
        SET
          semrush_images = jsonb_set(
            semrush_images, '{urls}', $1
          )
        WHERE
          id = $2
    `,
      [normalizedData, reportId]
    );
    console.log("succes update");
    return Response.json(data.rows);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Failed", status: 500 });
  }
}
