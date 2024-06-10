import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  console.log(id);
  try {
    const data = await sql`
      SELECT * FROM agency_template
      WHERE EXISTS (
        SELECT 1
        FROM reports
        WHERE reports.agency_id = ${id}
      )
      `;
    if (data.rows.length > 0) {
      return Response.json({ message: "tiene reportes asociados" });
    } else {
      return Response.json({ message: "no tiene reportes asociados" });
    }
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Database Error: Failed to Delete agency template.",
    });
  }
}
