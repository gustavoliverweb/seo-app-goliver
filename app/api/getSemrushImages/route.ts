import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  noStore();
  const reportId = request.nextUrl.searchParams.get("reportId");
  console.log(reportId);
  try {
    const data = await sql`
      SELECT semrush_images FROM reports
      WHERE id = ${reportId}
    `;
    console.log(data.rows);
    return Response.json(data.rows);
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
