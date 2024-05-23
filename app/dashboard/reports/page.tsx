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
  return (
    <div className="relative pb-6 flex flex-grow">
      <ReportsWrapper
        reports={reports}
        query={query}
        reportsPages={reportsPages}
      />
    </div>
  );
}
