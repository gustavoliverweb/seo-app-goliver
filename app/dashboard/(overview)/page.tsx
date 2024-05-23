import WrapperAgency from "@/app/ui/agency/WrapperAgency";
import { fetchAgencyPages, fetchAgencyTemplate } from "@/app/lib/data";

export default async function Page() {
  const agencyPages = await fetchAgencyPages();

  const agencys = await fetchAgencyTemplate();
  return (
    <div className="pb-6 flex flex-grow">
      <WrapperAgency agencys={agencys} agencyPages={agencyPages} />
    </div>
  );
}
