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
      <WrapperAgency agencys={agencys} agencyPages={agencyPages} />
    </div>
  );
}
