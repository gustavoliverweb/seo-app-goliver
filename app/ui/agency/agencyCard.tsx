import { AgencyTemplate } from "@/app/lib/definitions";
import SvgCoverAgency from "../svgCoverAgency";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function AgencyCard({
  agency,
  setShowModal,
  setAgencyData,
}: {
  agency: AgencyTemplate;
  setShowModal: (showModal: boolean) => void;
  setAgencyData: (agencyId: { id: string; name: string }) => void;
}) {
  const handleDeleteAgency = () => {
    setAgencyData({
      id: agency.id,
      name: agency.name,
    });
    setShowModal(true);
  };
  return (
    <>
      <div className="relative max-w-[250px] lg:w-full  h-80 rounded-lg border-2 border-gray-200 ">
        <SvgCoverAgency agency={agency} />
        <div className="absolute top-2 right-2">
          <div
            className="flex text-white items-center rounded-full p-1  bg-secondary-green-500 cursor-pointer hover:bg-green-600 transition-colors"
            onClick={handleDeleteAgency}
          >
            {<XMarkIcon className="h-4 w-4 " />}
          </div>
        </div>
      </div>
      <div className="mt-2 font-medium">{agency?.name}</div>
    </>
  );
}
