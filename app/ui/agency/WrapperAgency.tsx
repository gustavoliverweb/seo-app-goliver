"use client";
import { AgencyCard } from "./agencyCard";
import { useState } from "react";
import ConfirmModal from "../confirmModal";
import { AgencyTemplate } from "@/app/lib/definitions";
import { deleteAgencyTemplate } from "@/app/lib/actions";
import { CreateAgency } from "../buttons";
import { useStore } from "@/app/lib/store";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function WrapperAgency({
  agencys,
}: {
  agencys: AgencyTemplate[] | undefined;
  agencyPages: number;
}) {
  const { isDark, setIsModalDeleteShow } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [agencyData, setAgencyData] = useState({
    id: "",
    name: "",
  });
  const router = useRouter();
  const deleteAgencyWithId = deleteAgencyTemplate.bind(null, agencyData.id);
  // const [deleteMessage, setDeleteMessage] = useState<string>("");
  // useEffect(() => {
  //   if (showModal) {
  //     (async () => {
  //       const response = await fetch(
  //         `/api/checkIfReportExist?id=${agencyData.id}`
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //       setDeleteMessage(data.message);
  //     })();
  //   }
  // }, [showModal]);

  if (!agencys?.length) {
    return (
      <div className="flex flex-grow justify-center items-center">
        No hay plantillas creadas
      </div>
    );
  }
  // console.log(agencys);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(agencyData);
    const result = await deleteAgencyWithId();
    console.log(result);
    setShowModal(false);
    setIsModalDeleteShow(false);
    if (result.success) {
      router.push(`/dashboard`);
      router.refresh();
    }
  };
  return (
    <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
      <div
        className={clsx(
          "p-5 rounded-2xl lg:flex justify-between items-center w-full transition",
          {
            "bg-white": !isDark,
            "bg-dark-dark-background-panels": isDark,
          }
        )}
      >
        <h3
          className={clsx(
            "text-title font-medium text-primary-text-500 transition",
            {
              "text-primary-text-500": !isDark,
              "text-white": isDark,
            }
          )}
        >
          Plantillas de informes
        </h3>
        <CreateAgency />
      </div>
      <div
        className={clsx(
          " h-max overflow-auto p-5 rounded-2xl w-full flex-grow flex flex-col justify-between transition",
          {
            "bg-white": !isDark,
            "bg-dark-dark-background-panels": isDark,
          }
        )}
      >
        <div className="grid place-items-center grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] grid-rows-[auto,_auto] gap-4 mt-6">
          {agencys &&
            agencys.map((agency) => (
              <div key={agency.id}>
                <AgencyCard
                  agency={agency}
                  setShowModal={setShowModal}
                  setAgencyData={setAgencyData}
                />
              </div>
            ))}
          <ConfirmModal
            showModal={showModal}
            setShowModal={setShowModal}
            handleSubmit={handleSubmit}
          >
            ¿Estas seguro de eliminar la plantilla{" "}
            <span className="font-medium">{agencyData.name}</span>?
          </ConfirmModal>
        </div>
      </div>
    </div>
  );
}
