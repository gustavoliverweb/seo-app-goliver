import Pagination from "@/app/ui/pagination";
import { CreateAgency } from "@/app/ui/buttons";

import WrapperAgency from "@/app/ui/agency/WrapperAgency";
import { fetchAgencyPages, fetchFilteredAgency } from "@/app/lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const agencyPages = await fetchAgencyPages();
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const agencys = await fetchFilteredAgency(query, currentPage);
  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div className="bg-white p-5 rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title font-medium text-primary-text-500">
            Plantillas de informes
          </h3>
          <CreateAgency />
        </div>
        <div className="relative h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col justify-between">
          <WrapperAgency agencys={agencys} />

          <div className="mt-5 flex w-full ">
            <Pagination totalPages={agencyPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
