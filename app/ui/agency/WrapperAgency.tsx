import { fetchFilteredAgency } from "@/app/lib/data";
import { AgencyCard } from "./agencyCard";

export default async function WrapperAgency({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const agencys = await fetchFilteredAgency(query, currentPage);

  if (!agencys?.length) {
    return (
      <div className="flex flex-grow justify-center items-center">
        No hay plantillas creadas
      </div>
    );
  }
  console.log(agencys);
  return (
    <div className="bg-white grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] grid-rows-[auto,_auto] gap-4 mt-6">
      {agencys &&
        agencys.map((agency) => (
          <div key={agency.id}>
            <AgencyCard agency={agency} />
          </div>
        ))}
    </div>
  );
}
