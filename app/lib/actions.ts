/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";
import { Customer } from "./definitions";
import bcrypt from "bcrypt";

const AgencyTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "El nombre debe tener al menos 1 letra" }),
  float_cover_elements1: z.string(),
  float_cover_elements2: z.string(),
  float_cover_elements3: z.string(),
  title_content_header: z.string(),
  background_content_pages: z.string(),
  back_cover_background: z.string(),
  floating_back_cover_elements1: z.string(),
  floating_back_cover_elements2: z.string(),
  logo_url: z.string(),
  opacity_logo_url: z.string(),
  logo_url_valid: z.object({
    size: z.number().min(1, { message: "Cargue un archivo de imagen" }),
  }),
  logo_opacity_url_valid: z.object({
    size: z.number().min(1, { message: "Cargue un archivo de imagen" }),
  }),
});

const ReportsSchema = z.object({
  report_id: z.string(),
  agency_id: z.string(),
  select_template: z.string().min(1, { message: "Seleccione una plantilla" }),
  name: z.string().min(1, { message: "El nombre debe tener al menos 1 letra" }),
  url_site: z.string().min(1, { message: "Introduzca una URL" }),
  yes_radio: z.boolean().default(false).optional(),
  no_radio: z.boolean().default(false).optional(),
});

const AgencyClientsSchema = z.object({
  agency_name: z
    .string()
    .min(1, { message: "El nombre debe tener al menos 1 letra" }),
  client_name: z
    .string()
    .min(1, { message: "El nombre debe tener al menos 1 letra" }),
  monthly_payment: z.string().min(1, { message: "Introduzca un monto" }),
  color_card: z.string(),
  logo_url: z.string(),
  logo_url_valid: z.object({
    size: z.number().min(1, { message: "Cargue un archivo de imagen" }),
  }),
});

const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "El nombre debe tener al menos 1 letra" }),
  email: z
    .string()
    .email({ message: "Introduzca un correo electrónico válido" }),
  password: z.string().min(1, { message: "Introduzca una contraseña" }),
  user_role: z.string().min(1, { message: "Introduzca un rol" }),
  user_avatar: z.string().or(z.literal("")),
  user_avatar_valid: z.object({
    size: z.number().min(0, { message: "Cargue un archivo de imagen" }),
  }),
});

// const PotentialCustomerSchema = z.object({
//   name: z.string().min(1, { message: "El nombre debe tener al menos 1 letra" }),
//   status: z.string(),
//   paid_type: z.string(),
//   paid_amount: z.string(),
// });

const CreateAgencyTemplate = AgencyTemplateSchema.omit({ id: true });
const CreateReports = ReportsSchema.omit({ report_id: true });
const CreateAgencyClients = AgencyClientsSchema;
const UserTemplate = UserSchema.omit({ id: true });

export type StateAgencyTemplate = {
  errors?: {
    name?: string[];
    float_cover_elements1?: string[];
    float_cover_elements2?: string[];
    float_cover_elements3?: string[];
    title_content_header?: string[];
    background_content_pages?: string[];
    back_cover_background?: string[];
    floating_back_cover_elements1?: string[];
    floating_back_cover_elements2?: string[];
    logo_url?: string[];
    opacity_logo_url?: string[];
    logo_url_valid?: string[];
    logo_opacity_url_valid?: string[];
  };
  message?: string | null;
};

export type StateReports = {
  errors?: {
    agency_id?: string[];
    select_template?: string[];
    name?: string[];
    url_site?: string[];
    yes_radio?: string[];
    no_radio?: string[];
  };
  message?: string | null;
};

type StateAgencyClient = {
  errors?: {
    name?: string[];
    agency_name?: string[];
    client_name?: string[];
    monthly_payment?: string[];
    color_card?: string[];
    logo_url?: string[];
    logo_url_valid?: string[];
  };
  message?: string | null;
};

type User = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    user_role?: string[];
    user_avatar?: string[];
    user_avatar_valid?: string[];
  };
  message?: string | null;
};

// type StatePotentialCustomer = {
//   errors?: {
//     name?: string[];
//     status?: string[];
//     paid_type?: string[];
//     paid_amount?: string[];
//   };
//   message?: string | null;
// };

// (prevState: string, formData: FormData) => Promise<{ errors: { current_price?: string[] | undefined; };
// message: string; } | { message: string; errors?: undefined; } | undefined>

export async function createAgencyTemplate(
  prevState: StateAgencyTemplate,
  formData: FormData
) {
  // console.log(formData);
  const validatedFields = CreateAgencyTemplate.safeParse({
    name: formData.get("name"),
    float_cover_elements1: formData.get("float_cover_elements1"),
    float_cover_elements2: formData.get("float_cover_elements2"),
    float_cover_elements3: formData.get("float_cover_elements3"),
    title_content_header: formData.get("title_content_header"),
    background_content_pages: formData.get("background_content_pages"),
    back_cover_background: formData.get("back_cover_background"),
    floating_back_cover_elements1: formData.get(
      "floating_back_cover_elements1"
    ),
    floating_back_cover_elements2: formData.get(
      "floating_back_cover_elements2"
    ),

    logo_url: formData.get("logo_url"),
    opacity_logo_url: formData.get("opacity_logo_url"),
    logo_url_valid: formData.get("logo_url_valid"),
    logo_opacity_url_valid: formData.get("logo_opacity_url_valid"),
  });
  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. Error al crear la plantilla",
    };
  }
  const {
    name,
    float_cover_elements1,
    float_cover_elements2,
    float_cover_elements3,
    title_content_header,
    background_content_pages,
    back_cover_background,
    floating_back_cover_elements1,
    floating_back_cover_elements2,
    logo_url,
    opacity_logo_url,
  } = validatedFields.data;
  console.log(validatedFields.data);
  try {
    await sql`
    INSERT INTO agency_template (name, float_cover_elements1, float_cover_elements2, float_cover_elements3, title_content_header, background_content_pages, back_cover_background, floating_back_cover_elements1, floating_back_cover_elements2, logo_url, opacity_logo_url)
    VALUES (${name}, ${float_cover_elements1}, ${float_cover_elements2}, ${float_cover_elements3}, ${title_content_header}, ${background_content_pages}, ${back_cover_background}, ${floating_back_cover_elements1}, ${floating_back_cover_elements2},  ${logo_url}, ${opacity_logo_url})
    `;
  } catch (e) {
    console.log(e);
    return {
      message: "Database Error: Failed to Create agency tamplate.",
    };
  }
  redirect("/dashboard");
}

export async function CreateReportAction(
  prevState: StateReports,
  formData: FormData
) {
  noStore();
  // console.log("formData", formData.get("select_template"));
  // console.log("formData", formData.get("name"));
  // console.log("formData", formData.get("url_site"));
  console.log("formData", formData.get("yes_radio"));
  console.log("formData", formData.get("no_radio"));
  const validatedFields = CreateReports.safeParse({
    agency_id: formData.get("agency_id"),
    select_template: formData.get("select_template"),
    name: formData.get("name"),
    url_site: formData.get("url_site"),
    yes_radio: formData.get("yes_radio") === null ? false : true,
    no_radio: formData.get("no_radio") === null ? false : true,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. Error al crear el crear el reporte",
    };
  }
  const { agency_id, select_template, name, url_site, yes_radio, no_radio } =
    validatedFields.data;
  try {
    await sql`
      INSERT INTO reports (agency_id, select_template, name, url_site, yes_radio, no_radio)
      VALUES (${agency_id}, ${select_template}, ${name}, ${url_site}, ${yes_radio}, ${no_radio})
    `;
    console.log("sucess insert report");
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Report.",
    };
  }
  redirect("/dashboard/reports");
}

export async function deleteReport(id: string) {
  console.log("delete report", id);
  try {
    await sql`DELETE FROM reports WHERE id = ${id}`;
    revalidatePath("/dashboard/reports");
    console.log("Reporte eliminado con éxito");
    return { message: "Reporte eliminado con éxito" };
  } catch (error) {
    console.log("Error al eliminar el reporte", error);
    return { message: "Database Error: Error al eliminar el reporte" };
  }
}

export async function createAgencyClients(
  prevState: StateAgencyClient,
  formData: FormData
) {
  noStore();
  const validatedFields = CreateAgencyClients.safeParse({
    agency_name: formData.get("agency_name"),
    client_name: formData.get("client_name"),
    monthly_payment: formData.get("monthly_payment"),
    color_card: formData.get("color_card"),
    logo_url: formData.get("logo_url"),
    logo_url_valid: formData.get("logo_url_valid"),
  });
  console.log(formData.get("agency_name"));
  console.log(formData.get("client_name"));
  // console.log(formData.get("monthly_payment"));
  // console.log(formData.get("color_card"));
  // console.log(formData.get("logo_url"));
  // console.log(formData.get("logo_url_valid"));
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. Error al crear el cliente",
    };
  }
  const { agency_name, client_name, monthly_payment, color_card, logo_url } =
    validatedFields.data;
  try {
    const existingAgency = await sql`
    SELECT * FROM agency_client WHERE agency_name = ${agency_name}
  `;
    const agencyId = existingAgency.rows[0]?.id;
    console.log(agencyId);
    if (existingAgency?.rows.length === 0) {
      console.log("not exist");
      await sql`
      WITH agency_id AS (
        INSERT INTO agency_client (agency_name)
        VALUES (${agency_name})
        RETURNING id
      )
      INSERT INTO clients (agency_id, name, monthly_payment, color_card, logo_url)
      VALUES ((SELECT id FROM agency_id), ${client_name}, ${monthly_payment}, ${color_card}, ${logo_url})
    `;
    } else {
      console.log("exist");
      await sql`
      INSERT INTO clients (agency_id, name, monthly_payment, color_card, logo_url)
      VALUES (${agencyId}, ${client_name}, ${monthly_payment}, ${color_card}, ${logo_url})
    `;
    }

    console.log("success insert agency clients");
  } catch (error) {
    console.log("error insert agency clients");
    return {
      message: `Database Error: Failed to Create Agency Client. ${error}`,
    };
  }
  redirect("/dashboard/clients");
}

export async function deleteClient(
  id: string,
  page: string | null,
  agencyId: string
) {
  console.log(id, agencyId);
  try {
    await sql`DELETE FROM clients WHERE id = ${id}`;
    // const agency = await sql`
    // DELETE FROM agency_client WHERE NOT EXISTS(
    //   SELECT 1
    //   FROM clients
    //   WHERE agency_client.id = ${agencyId}
    // )
    // `;
    // console.log(agency);
    console.log("success delete client");
    // revalidatePath(`/dashboard/clients?page=${page}`);
    return { message: "Cliente eliminado con éxito", success: true };
  } catch (error) {
    return {
      message: "Database Error: Error al eliminar el cliente",
      success: false,
    };
  }
}

export async function createPotentialCustomer(data: Customer) {
  noStore();
  console.log(data);
  const existingCustomer = await sql`
    SELECT * FROM potential_customer WHERE id = ${data.id}
  `;
  if (existingCustomer?.rows.length > 0) {
    // Update existing customer
    try {
      await sql`
        UPDATE potential_customer
        SET name = ${data.name}, status = ${data.status}, paid_type = ${data.paid_type}, paid_amount = ${data.paid_amount}
        WHERE id = ${data.id}
      `;
      console.log("success update potential customer");
    } catch (error) {
      console.log("error update potential customer");
      return {
        message: `Database Error: Failed to Update Potential Customer. ${error}`,
      };
    }
  } else {
    // Create new customer
    try {
      await sql`
        INSERT INTO potential_customer (id, name, status, paid_type, paid_amount)
        VALUES (${data.id}, ${data.name}, ${data.status}, ${data.paid_type}, ${data.paid_amount})
      `;
      console.log("success insert potential customer");
    } catch (error) {
      console.log("error insert potential customer");
      return {
        message: `Database Error: Failed to Create Potential Customer. ${error}`,
      };
    }
  }
  // revalidatePath("/dashboard/potential-customer");
}

export async function createUser(prevState: User, formData: FormData) {
  noStore();
  const validatedFields = UserTemplate.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    user_role: formData.get("user_role"),
    user_avatar: formData.get("user_avatar"),
    user_avatar_valid: formData.get("user_avatar_valid"),
  });

  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. Error al crear el usuario",
    };
  }
  const { name, email, password, user_role, user_avatar } =
    validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`INSERT INTO users_go (name, email, password, user_role, user_avatar)
    VALUES (${name}, ${email}, ${hashedPassword}, ${user_role}, ${user_avatar})`;
    console.log("success insert user");
  } catch (error) {
    console.log("error insert user");
    return {
      message: `Database Error: Failed to Create User. ${error}`,
    };
  }
  redirect("/dashboard/users");
}

export async function deleteUser(id: string) {
  console.log(id);
  try {
    await sql`DELETE FROM users_go WHERE id = ${id}`;
    console.log("success delete user");
    revalidatePath("/dashboard/users");
    return { message: "User Deleted." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete User." };
  }
}

export async function deletePotentialCustomer(id: string) {
  console.log(id);
  try {
    await sql`DELETE FROM potential_customer WHERE id = ${id}`;
    console.log("success delete potential customer", id);
    revalidatePath("/dashboard/potential-customer");
    return { message: "Potential Customer Deleted." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Potential Customer." };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  console.log(formData);
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
