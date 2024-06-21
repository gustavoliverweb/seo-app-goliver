import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

// UPDATE potential_customer SET position =
// CASE
// WHEN potential_customer.id = $1 THEN $2
// WHEN potential_customer.id = $3 THEN $4
// ELSE potential_customer.position END;

function validarEscapeDatos(datos: number | string) {
  if (typeof datos === "number") {
    return datos.toString().replace(/['"]/g, "\\$&");
  } else {
    return datos.replace(/['"]/g, "\\$&");
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  for (const item of data) {
    if (
      !item ||
      typeof item.id !== "string" ||
      typeof item.position !== "number"
    ) {
      throw new Error("Datos de artículo inválidos");
    }
    item.id = validarEscapeDatos(item.id);
    item.position = validarEscapeDatos(item.position);
  }
  let query = "UPDATE potential_customer SET position = CASE ";
  const values = [];
  try {
    let plusIndex = 1;
    let plusIndex2 = 2;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const subQuery = `WHEN potential_customer.id = $${
        index + plusIndex
      } THEN $${index + plusIndex2} `;
      query += subQuery;
      values.push(element.id, Number(element.position));
      plusIndex++;
      plusIndex2++;
    }
    query += "ELSE potential_customer.position END;";
    console.log(query);
    console.log(values);
    await sql.query(query, values);
    return Response.json({ message: "Success", status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Failed", status: 500 });
  }
}
