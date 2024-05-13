import { Clients } from "@/app/lib/definitions";
import Image from "next/image";
// import { Button } from "../button";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function ClientsCard({
  client,
  setShowModal,
  setClientData,
}: {
  client: Clients;
  setShowModal: (showModal: boolean) => void;
  setClientData: (clientId: {
    id: string;
    name: string;
    agencyId: string;
  }) => void;
}) {
  const handleDeleteClient = () => {
    console.log("Delete client", client);
    setClientData({
      id: client.id,
      name: client.name,
      agencyId: client.agency_id,
    });
    setShowModal(true);
  };
  return (
    <div className="relative">
      <div
        style={{ background: client.color_card }}
        className={`w-full h-auto rounded-lg flex justify-center items-center aspect-square`}
      >
        <Image
          className="object-scale-down h-full w-full"
          src={client.logo_url}
          alt="Logo cliente"
          width={200}
          height={200}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div>
          <div className="font-semibold">{client.name}</div>
        </div>
        <div>
          <div>
            <span className="font-semibold">Plan:</span>{" "}
            {client.monthly_payment}$/mes
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <div
          className="flex text-white items-center rounded-full p-1  bg-secondary-green-500 cursor-pointer hover:bg-green-600 transition-colors"
          onClick={handleDeleteClient}
        >
          {<XMarkIcon className="h-4 w-4 " />}
        </div>
      </div>
    </div>
  );
}
