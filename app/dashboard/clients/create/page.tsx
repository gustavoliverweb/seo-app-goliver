import { fetchClients } from "@/app/lib/data";
import CreateClientForm from "@/app/ui/clients/createClientForm";

export default async function Page() {
  const agencys = (await fetchClients()) || [];
  const agencyName = agencys?.map((agency) => agency.agency_name);
  return (
    <main>
      <div className="items-start justify-between mt-6 mb-6">
        <div className=" bg-white p-5 md:mr-5 md:ml-5 rounded-2xl lg:flex justify-between items-center">
          <h3 className="text-title text-text-text-primary-500 font-medium">
            Nuevo cliente
          </h3>
        </div>
        <div className="relative h-max overflow-auto mt-6 bg-white p-5 md:mr-5 md:ml-5 rounded-2xl">
          <CreateClientForm agencys={agencyName} />
        </div>
      </div>
    </main>
  );
}
