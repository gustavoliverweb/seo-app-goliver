import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useStore } from "../lib/store";
import clsx from "clsx";

export function CreateAgency() {
  return (
    <Link
      href="/dashboard/agency/create"
      className="flex mt-3 md:mt-0 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-sm  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="text-base">Nueva agencia</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function SaveAgency() {
  return (
    <Link
      href="/dashboard/agency/create"
      className="flex mt-3 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-sm  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="text-base">Guardar ajustes</span>{" "}
    </Link>
  );
}

export function CreateUser() {
  return (
    <Link
      href="/dashboard/users/create"
      className="flex mt-3 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-sm  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="text-base">Nuevo usuario</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditUser({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/users/edit/${id}`}
      className="flex  h-10 items-center mr-4 rounded-lg border border-gray-200 p-6 text-sm  transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="text-base">Editar</span>{" "}
    </Link>
  );
}

export function SaveUser() {
  return (
    <Link
      href="/dashboard/users/create"
      className="flex mt-3 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-sm  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="text-base">Crear usuario</span>{" "}
    </Link>
  );
}

export function CreateReport() {
  return (
    <Link
      href="/dashboard/reports/create"
      className="flex mt-3 md:mt-0 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-sm  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="text-base">Nuevo informe</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreatePdf({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pdf/${id}`}
      className="flex items-center rounded-md border border-gray-200 py-2 px-8 text-sm  text-primary-text-500 transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="text-base">Generar PDF</span>{" "}
    </Link>
  );
}

export async function deleteImageId({ id }: { id: string }) {
  "use client";
  try {
    const response = await fetch(
      `http://localhost:3000/api/deleteImage?image=${id}`,
      { method: "DELETE" }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function AttachReports({ id, name }: { id: string; name: string }) {
  const { isDark } = useStore();
  return (
    <Link
      href={`/dashboard/reports/attach/${id}?report=${name}`}
      className={clsx(
        "flex items-center rounded-md border border-gray-200 p-2 text-sm  text-primary-text-500 transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
        {
          "text-dark-dark-text": isDark,
          "border-dark-dark-border": isDark,
        }
      )}
    >
      <span className="text-base">Adjuntar</span>{" "}
    </Link>
  );
}

export function CreateClient() {
  return (
    <Link
      href="/dashboard/clients/create"
      className="flex mt-3 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-sm  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="text-base">Nuevo cliente</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function SaveClient() {
  return (
    <Link
      href="/dashboard/agency/create"
      className="flex mt-3 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-sm  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="text-base">Guardar cliente</span>{" "}
    </Link>
  );
}

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
