import { sql } from "@vercel/postgres";
import {
  AgencyTemplate,
  Clients,
  Customer,
  ReportsCardType,
  UserType,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

// Puede usar una API Next.js llamada dentro de los componentes del servidor o funciones de
// obtención de datos para excluirse de la representación estática. Agreguemos esto.unstable_noStore

// Nota: es una API experimental y puede cambiar en el futuro. Si prefiere utilizar una API
// estable en sus propios proyectos, también puede utilizar la opción Configuración de
// segmento .unstable_noStoreexport const dynamic = "force-dynamic"

const ITEMS_PER_PAGE = 3;
const AGENCY_ITEMS_PER_PAGE = 6;

export async function fetchAgencyTemplate() {
  noStore();
  try {
    const data = await sql<AgencyTemplate>`
      SELECT *
      FROM agency_template
    `;
    // console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchAgencyPages() {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM agency_template
  `;

    const totalPages = Math.ceil(
      Number(count.rows[0].count) / AGENCY_ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of agencys.");
  }
}

export async function fetchFilteredAgency(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * AGENCY_ITEMS_PER_PAGE;
  try {
    const agency = await sql<AgencyTemplate>`
    SELECT 
    *
    FROM agency_template
    WHERE
    agency_template.name ILIKE ${`%${query}%`} 
    LIMIT ${AGENCY_ITEMS_PER_PAGE} OFFSET ${offset}
   
    `;
    return agency.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch agencys.");
  }
}

export async function fetchReports() {
  noStore();
  try {
    const data = await sql`
      SELECT 
       * 
      FROM agency_template
      JOIN reports
      ON agency_template.id = reports.agency_id
    `;
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchReportId(id: string) {
  noStore();
  // console.log("action fetch", id);
  try {
    const data = await sql`
      SELECT
       *
      FROM agency_template
      JOIN reports
      ON agency_template.id = reports.agency_id
      WHERE reports.id = ${id}
    `;
    // console.log(data);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchReportsPages() {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM reports
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of reports.");
  }
}

export async function fetchFilteredReports(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  // console.log("query", `${`%${query}%`}`);
  try {
    const reports = await sql<ReportsCardType>`
    SELECT 
    *
    FROM reports
    WHERE
    reports.name ILIKE ${`%${query}%`} 
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return reports.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reports.");
  }
}

export async function fetchClients() {
  noStore();
  try {
    const data = await sql`
      SELECT 
       * 
      FROM agency_client
      JOIN clients
      ON agency_client.id = clients.agency_id
    `;
    // console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchFilteredClients(query: string) {
  noStore();
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  // console.log(query, currentPage);
  try {
    const clients = await sql<Clients>`
    SELECT
    *
    FROM agency_client
    JOIN clients
    ON agency_client.id = clients.agency_id
    WHERE
    agency_client.agency_name ILIKE ${`%${query}%`}

    `;
    // console.log(clients.rows);
    return clients.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch clients.");
  }
}

export async function fetchFilteredClientsTest(query: string) {
  noStore();
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  // console.log(query, currentPage);
  try {
    const clients = await sql<Clients>`
    SELECT
    *
    FROM a_c_test
    JOIN c_test
    ON a_c_test.id = c_test.agency_id
    WHERE
    a_c_test.agency_name ILIKE ${`%${query}%`}

    `;
    // console.log(clients.rows);
    return clients.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch clients.");
  }
}

export async function fetchClientsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM agency_client
    WHERE
    agency_client.agency_name ILIKE ${`%${query}%`}
  `;
    // console.log(count.rows);

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchClientsPagesTest(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM a_c_test
    WHERE
    a_c_test.agency_name ILIKE ${`%${query}%`}
  `;
    // console.log(count.rows);

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchFilteredPotentialCustomers(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const customers = await sql<Customer>`
    SELECT 
    *
    FROM potential_customer
    WHERE
    potential_customer.name ILIKE ${`%${query}%`} 
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
   
    `;
    console.log("items", customers.rows);
    return customers.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch potential customers.");
  }
}

export async function fetchPotentialCustomersPages() {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM potential_customer
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    // console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchPotentialCustomers() {
  noStore();
  try {
    const data = await sql<Customer>`
      SELECT 
       * 
      FROM potential_customer
      ORDER BY id ASC
    `;
    // console.log("fetch data", data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchFilteredUsers(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<UserType>`
      SELECT
       *
      FROM users_go
      WHERE  users_go.name ILIKE ${`%${query}%`} 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    // console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function fetchUsers() {
  noStore();
  try {
    const data = await sql<UserType>`
      SELECT
       *
      FROM users_go
    `;
    // console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchUsersId(id: string) {
  noStore();
  try {
    const data = await sql<UserType>`
      SELECT
       *
      FROM users_go
      WHERE  users_go.id = ${id}  
    `;
    // console.log(data.rows);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchUsersPages() {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM users_go
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of agencys.");
  }
}

export async function fetchAuditId(id: string) {
  noStore();
  // console.log(id);
  try {
    const data = await sql`
      SELECT
       *
      FROM audit
      WHERE audit.report_id = ${id}
    `;
    // console.log(data);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}

// export async function fetchDollarPrice() {
//   noStore();
//   try {
//     const data = await sql<DollarForm>`
//       SELECT
//         dollar.id,
//         dollar.current_price
//       FROM dollar
//     `;
//     // console.log(data.rows[0]);
//     return data.rows[0];
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch dollar price.");
//   }
// }

// export async function fetchFilteredProducts(
//   query: string,
//   currentPage: number
// ) {
//   noStore();
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
//   try {
//     const products = await sql<ProductsTable>`
//     SELECT
//     *
//     FROM products
//     WHERE
//     products.name ILIKE ${`%${query}%`}
//     LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}

//     `;
//     // console.log(products.rows);
//     return products.rows;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch invoices.");
//   }
// }

// export async function fetchProductById(id: string) {
//   noStore();
//   try {
//     const data = await sql<ProductForm>`
//       SELECT
//         products.id,
//         products.name,
//         products.buy_price_dollar,
//         products.quantity,
//         products.revenue
//       FROM products
//       WHERE products.id = ${id};
//     `;

//     // const invoice = data.rows.map((invoice) => ({
//     //   ...invoice,
//     //   // Convert amount from cents to dollars
//     //   amount: invoice.amount / 100,
//     // }));
//     // console.log(data);
//     return data.rows[0];
//   } catch (error) {
//     console.error("Database Error:", error);
//   }
// }

// export async function fetchProductsPages(query: string) {
//   noStore();
//   try {
//     const count = await sql`SELECT COUNT(*)
//     FROM products
//     WHERE
//     products.name ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch total number of invoices.");
//   }
// }

// export async function getUser(email: string) {
//   noStore();
//   try {
//     const user = await sql`SELECT * from USERS where email=${email}`;
//     return user.rows[0] as User;
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }
