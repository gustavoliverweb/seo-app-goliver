import Pagination from "@/app/ui/pagination";
import { CreateReport } from "@/app/ui/buttons";

import ReportsWrapper from "@/app/ui/reports/reportsWrapper";
import { fetchFilteredReports, fetchReportsPages } from "@/app/lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const reportsPages = await fetchReportsPages();
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const reports = await fetchFilteredReports(query, currentPage);
  console.log(reports);
  return (
    <div className="relative pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col gap-6 px-6">
        <div className="bg-white p-5 rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title text-primary-text-500 font-medium">
            Informes
          </h3>
          <CreateReport />
        </div>
        <div className=" h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col justify-between">
          <ReportsWrapper reports={reports} query={query} />

          <div className="mt-5 flex w-full ">
            <Pagination totalPages={reportsPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
