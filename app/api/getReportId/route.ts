import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // console.log(request.nextUrl.searchParams.get("report-id"));
  const reportId = request.nextUrl.searchParams.get("report-id");
  // console.log("report id", reportId);
  try {
    const data = await sql`
      SELECT
       *
      FROM agency_template
      JOIN reports
      ON agency_template.id = reports.agency_id
      WHERE reports.id = ${reportId}
    `;
    // console.log("data", data);

    return Response.json(data.rows[0]);
  } catch (error) {
    console.error("Database Error:", error);
    return Response.json({ message: "status 500", data: error });
  }
}
