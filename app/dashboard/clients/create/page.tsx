import { fetchClients } from "@/app/lib/data";
import CreateClientWrapper from "@/app/ui/clients/createClientsWrapper";

export default async function Page() {
  const agencys = (await fetchClients()) || [];
  const agencyName = agencys?.map((agency) => agency.agency_name);
  console.log(agencyName);
  return (
    <div className="pb-6 flex flex-grow">
      <CreateClientWrapper agencyName={agencyName} />
    </div>
  );
}
