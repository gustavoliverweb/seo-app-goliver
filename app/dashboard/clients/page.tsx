/* eslint-disable @typescript-eslint/ban-ts-comment */
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

  return (
    <div className="pb-6 flex flex-grow ">
      <ClientsWrapper
        clients={clients}
        currentPage={currentPage}
        clientsPages={clientsPages}
        query={query}
      />
    </div>
  );
}
