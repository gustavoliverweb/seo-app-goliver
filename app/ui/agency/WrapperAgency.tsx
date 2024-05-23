"use client";
import { AgencyCard } from "./agencyCard";
import { useState } from "react";
import ConfirmModal from "../confirmModal";
import { AgencyTemplate } from "@/app/lib/definitions";
import { deleteAgencyTemplate } from "@/app/lib/actions";

export default function WrapperAgency({
  agencys,
}: {
  agencys: AgencyTemplate[];
}) {
  const [showModal, setShowModal] = useState(false);
  const [agencyData, setAgencyData] = useState({
    id: "",
    name: "",
  });
  const deleteAgencyWithId = deleteAgencyTemplate.bind(null, agencyData.id);
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
    // if (result.success) {
    //   // router.push(`/dashboard/clients`);
    //   // router.refresh();
    // }
  };
  return (
    <div className="bg-white grid place-items-center grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] grid-rows-[auto,_auto] gap-4 mt-6">
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
        <span className="font-medium">{agencyData.name}</span> ?
      </ConfirmModal>
    </div>
  );
}
