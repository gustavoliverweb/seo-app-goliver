/* eslint-disable @typescript-eslint/ban-ts-comment */
import Pagination from "@/app/ui/pagination";

import { CreateClient } from "@/app/ui/buttons";

import ClientsWrapper from "@/app/ui/clients/clientsWrapper";
import { fetchClientsPages, fetchFilteredClients } from "@/app/lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const clients = await fetchFilteredClients(query);
  const clientsPages = await fetchClientsPages(query);
  // console.log(clients);
  return (
    <div className="pb-6 flex flex-grow ">
      <div className="items-start mt-6 w-full flex flex-col gap-6 px-6">
        <div className="bg-white p-5 rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title text-primary-text-500 font-medium">
            Clientes
          </h3>
          <CreateClient />
        </div>
        <div className="h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col justify-between">
          <ClientsWrapper
            clients={clients}
            currentPage={currentPage}
            query={query}
          />

          <div className="mt-5 flex w-full ">
            <Pagination totalPages={clientsPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
