const { sql } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

// const { productsLar } = require("../app/lib/lar-inventario.js");
// const bcrypt = require("bcrypt");

// async function seedAgencyTemplate() {
//   try {
//     //genera identificadores únicos universales (UUID)
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     const createTable = await sql`
//     CREATE TABLE IF NOT EXISTS agency_template (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       primary_color TEXT,
//       title_color TEXT,
//       background_color1 TEXT,
//       background_color2 TEXT,
//       float_elements1 TEXT,
//       float_elements2 TEXT,
//       logo_url TEXT,
//       opacity_logo_url TEXT
//     )
//     `;
//     console.log("create agency_tamplate table");
//     return {
//       createTable,
//     };
//   } catch (error) {
//     console.error("Error seeding agency_template:", error);
//     throw error;
//   }
// }

async function seedAgencyTemplate() {
  try {
    //genera identificadores únicos universales (UUID)
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS agency_template (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      float_cover_elements1 TEXT,
      float_cover_elements2 TEXT,
      float_cover_elements3 TEXT,
      title_content_header TEXT,
      background_content_pages TEXT,
      back_cover_background TEXT,
      floating_back_cover_elements1 TEXT,
      floating_back_cover_elements2 TEXT,
      logo_url TEXT,
      opacity_logo_url TEXT
    )
    `;
    console.log("create agency_tamplate table");
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding agency_template:", error);
    throw error;
  }
}

async function seedReports() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS reports (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      agency_id UUID NOT NULL,
      select_template VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      url_site VARCHAR(255) NOT NULL,
      yes_radio BOOLEAN NOT NULL,
      no_radio BOOLEAN NOT NULL,
      FOREIGN KEY (agency_id) REFERENCES agency_template (id)
      ON DELETE CASCADE
    )
    `;
    console.log(`Created "reports" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding reports:", error);
    throw error;
  }
}

async function seedAudit() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS audit (
      id UUID PRIMARY KEY,
      report_id UUID UNIQUE NOT NULL,
      cover_image_url VARCHAR(255) NOT NULL,
      tecnical_report_url TEXT[] NOT NULL,
      keyword_study_url TEXT[] NOT NULL,
      semrush_url TEXT[] NOT NULL,
      CONSTRAINT fk_audit_report
      FOREIGN KEY (report_id) REFERENCES reports (id)
      ON DELETE CASCADE
      )
      `;

    console.log(`Created "audit" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding audit:", error);
    throw error;
  }
}

async function seedAgencyClient() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS agency_client (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      agency_name VARCHAR(255) NOT NULL
    )
    `;
    console.log(`Created "agency_client" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding agency_client:", error);
    throw error;
  }
}

async function seedAgencyClientTest() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS agency_client_test (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      agency_name VARCHAR(255) NOT NULL
    )
    `;
    console.log(`Created agency_client_test table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding agency_client_test:", error);
    throw error;
  }
}

async function seedClientsTest() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS clients_test (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      agency_id UUID NOT NULL,
      FOREIGN KEY (agency_id) REFERENCES agency_client_test (id)
    )
    `;
    console.log(`Created clients_test table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding clients_test:", error);
    throw error;
  }
}

async function seedClients() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS clients (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      monthly_payment DECIMAL(10,2) NOT NULL,
      color_card TEXT NOT NULL,
      agency_id UUID NOT NULL,
      logo_url TEXT NOT NULL,
      FOREIGN KEY (agency_id) REFERENCES agency_client (id)
      ON DELETE CASCADE
    )
    `;
    console.log(`Created "clients" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding clients:", error);
    throw error;
  }
}

async function createPotentialCustomerTable() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS potential_customer (
      id VARCHAR(255) NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      paid_type VARCHAR(255) NOT NULL,
      paid_amount DECIMAL(10,2) NOT NULL
    )
    `;
    console.log(`Created "potential_customers" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding potential_customers:", error);
    throw error;
  }
}

const users = [
  {
    name: "gustavo",
    email: "user@nextmail.com",
    password: "123456",
    user_role: "admin",
    user_avatar: null,
    reset_token: null,
  },
  {
    name: "alfredo",
    email: "devalfredomoscoso@gmail.com",
    password: "123456",
    user_role: "frontend",
    user_avatar: null,
    reset_token: null,
  },
];

async function createUser() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS users_go  (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      user_role VARCHAR(255) NOT NULL,
      user_avatar TEXT NULL,
      reset_token  VARCHAR(255) NULL
    )
    `;

    users.map(async (user) => {
      const { name, email, password, user_role, user_avatar } = user;
      const hashedPassword = await bcrypt.hash(password, 10);
      await sql`
      INSERT INTO users_go (name, email, password, user_role, user_avatar)
      VALUES (${name}, ${email}, ${hashedPassword}, ${user_role}, ${user_avatar})
      `;
    });
    console.log(`Created "users" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function dropUserTable() {
  try {
    // DROP TABLE users
    await sql`
        DROP TABLE users_go
        `;
    console.log("drop table users");
  } catch (error) {
    console.error("Error drop users:", error);
    throw error;
  }
}

async function dropTemplateTable() {
  try {
    // DROP TABLE reports
    await sql`
    DROP TABLE agency_template
    `;
    console.log("drop table agency_template");
  } catch (error) {
    console.error("Error drop products:", error);
    throw error;
  }
}

async function dropReportTable() {
  try {
    // DROP TABLE reports
    await sql`
    DROP TABLE reports
    `;
    console.log("drop table reports");
  } catch (error) {
    console.error("Error drop products:", error);
    throw error;
  }
}
async function dropAuditTable() {
  try {
    // DROP TABLE reports
    await sql`
    DROP TABLE audit
    `;
    console.log("drop table audit");
  } catch (error) {
    console.error("Error drop products:", error);
    throw error;
  }
}

// async function dropAgencyClients() {
//   try {
//     await sql`
//     DROP TABLE agency_client
//     `;
//     console.log("drop table agency_client");
//   } catch (error) {
//     console.error("Error drop agency_client:", error);
//     throw error;
//   }
// }

// async function dropClients() {
//   try {
//     await sql`
//     DROP TABLE clients
//     `;
//     console.log("drop table clients");
//   } catch (error) {
//     console.error("Error drop clients:", error);
//     throw error;
//   }
// }

async function dropPotentialCustomerTable() {
  try {
    await sql`
    DROP TABLE potential_customer
    `;
    console.log("drop table potential_customer");
  } catch (error) {
    console.error("Error drop potential_customer:", error);
    throw error;
  }
}

// async function seedUsers() {
//   try {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "invoices" table if it doesn't exist
//     const createTable = await sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//       );
//     `;

//     console.log(`Created "users" table`);

//     // Insert data into the "users" table
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       })
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return {
//       createTable,
//       users: insertedUsers,
//     };
//   } catch (error) {
//     console.error("Error seeding users:", error);
//     throw error;
//   }
// }

// async function seedInvoices() {
//   try {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "invoices" table if it doesn't exist
//     const createTable = await sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     customer_id UUID NOT NULL,
//     amount INT NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     date DATE NOT NULL
//   );
// `;

//     console.log(`Created "invoices" table`);

//     // Insert data into the "invoices" table
//     const insertedInvoices = await Promise.all(
//       invoices.map(
//         (invoice) => sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `
//       )
//     );

//     console.log(`Seeded ${insertedInvoices.length} invoices`);

//     return {
//       createTable,
//       invoices: insertedInvoices,
//     };
//   } catch (error) {
//     console.error("Error seeding invoices:", error);
//     throw error;
//   }
// }

// async function seedCustomers() {
//   try {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "customers" table if it doesn't exist
//     const createTable = await sql`
//       CREATE TABLE IF NOT EXISTS customers (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         image_url VARCHAR(255) NOT NULL
//       );
//     `;

//     console.log(`Created "customers" table`);

//     // Insert data into the "customers" table
//     const insertedCustomers = await Promise.all(
//       customers.map(
//         (customer) => sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `
//       )
//     );

//     console.log(`Seeded ${insertedCustomers.length} customers`);

//     return {
//       createTable,
//       customers: insertedCustomers,
//     };
//   } catch (error) {
//     console.error("Error seeding customers:", error);
//     throw error;
//   }
// }

// async function seedRevenue() {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `
//       )
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error("Error seeding revenue:", error);
//     throw error;
//   }
// }

async function dropTable() {
  try {
    await sql`
    DROP TABLE clients_test
    `;
    console.log("drop table ");
  } catch (error) {
    console.error("Error drop:", error);
    throw error;
  }
}

(async () => {
  // await seedUsers();
  // await seedCustomers();
  // await seedInvoices();
  // await seedRevenue();
  // await seedProducts();
  // await seedDollar();
  // await dropAuditTable();
  // await seedAudit();
  ///////////////////////////////
  // await dropReportTable();
  // await dropTemplateTable();
  // await seedAgencyTemplate();
  // await seedReports();
  // await dropPotentialCustomerTable();
  // await createPotentialCustomerTable();
  ///////////
  // await dropUserTable();
  // await createUser();
  // await dropTable();
  // await seedAgencyClientTest();
  // await seedClientsTest();
})();
