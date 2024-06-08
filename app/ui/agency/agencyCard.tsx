import { AgencyTemplate } from "@/app/lib/definitions";
import SvgCoverAgency from "../svgCoverAgency";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/app/lib/store";
import clsx from "clsx";

export function AgencyCard({
  agency,
  setShowModal,
  setAgencyData,
}: {
  agency: AgencyTemplate;
  setShowModal: (showModal: boolean) => void;
  setAgencyData: (agencyId: { id: string; name: string }) => void;
}) {
  const { isDark, setIsModalDeleteShow } = useStore();
  const handleDeleteAgency = () => {
    setAgencyData({
      id: agency.id,
      name: agency.name,
    });
    setShowModal(true);
    setIsModalDeleteShow(true);
  };
  return (
    <>
      <div className="relative max-w-[250px] lg:w-full  h-80 rounded-lg border-2 border-gray-200 bg-white">
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
      <div
        className={clsx("mt-2 font-medium", {
          "text-dark-dark-text": isDark,
          "text-black": !isDark,
        })}
      >
        {agency?.name}
      </div>
    </>
  );
}
