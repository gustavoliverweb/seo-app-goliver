import { Clients } from "@/app/lib/definitions";
import Image from "next/image";
import { PauseIcon, PlayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/app/lib/store";
import { useEffect, useState } from "react";
import { updateClient } from "@/app/lib/actions";
import clsx from "clsx";
import { useRouter } from "next/navigation";

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
  const { setIsModalDeleteShow } = useStore();
  const [isClientPaused, setIsClientPaused] = useState<boolean>(client.paused);
  const [clientId, setClientId] = useState<undefined | string>();
  const router = useRouter();
  const handleDeleteClient = () => {
    console.log("Delete client", client);
    setClientData({
      id: client.id,
      name: client.name,
      agencyId: client.agency_id,
    });
    setShowModal(true);
    setIsModalDeleteShow(true);
  };

  const handlePauseCLient = () => {
    // console.log("Pause client", client);
    const clientId = client.id;
    setClientId(clientId);
    setIsClientPaused(!isClientPaused);
  };

  useEffect(() => {
    // console.log(isClientPaused);
    if (clientId) {
      console.log(clientId, isClientPaused);
      (async () => {
        await updateClient(clientId, isClientPaused);
        // router.push("/dashboard/clients");
        router.refresh();
      })();
    }
  }, [isClientPaused]);
  return (
    <div className="relative">
      <div
        className={clsx({
          "opacity-40": isClientPaused,
          // "outline outline-1": isClientPaused,
          // "outline-red-500": isClientPaused,
        })}
      >
        <div
          style={{ background: client.color_card }}
          className="w-full h-auto rounded-lg flex justify-center items-center aspect-square p-4"
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
      </div>
      <div className="absolute top-2 right-2">
        <div
          className="flex text-white items-center rounded-full p-1  bg-secondary-green-500 cursor-pointer hover:bg-green-600 transition-colors"
          onClick={handleDeleteClient}
        >
          {<XMarkIcon className="h-4 w-4 " />}
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <div
          className="flex text-white items-center rounded-full p-1  bg-primary-button-500 cursor-pointer hover:bg-[#4E308B] transition-colors"
          onClick={handlePauseCLient}
        >
          {isClientPaused ? (
            <PlayIcon className="h-4 w-4 " />
          ) : (
            <PauseIcon className="h-4 w-4 " />
          )}
        </div>
      </div>
      <div
        className={clsx(
          "absolute top-1/2 w-full flex justify-center bg-primary-button-500 transition",
          {
            "opacity-0": !isClientPaused,
            "opacity-100": isClientPaused,
          }
        )}
      >
        <div className="text-[18px] font-semibold text-white">Pausado</div>
      </div>
    </div>
  );
}
