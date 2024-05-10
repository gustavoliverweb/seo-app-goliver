/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { ReportsCard } from "./reportsCard";
import { useState } from "react";
import ConfirmModal from "../confirmModal";
import { deleteReport } from "@/app/lib/actions";
import { ReportsCardType } from "@/app/lib/definitions";

export default function ReportsWrapper({
  reports,
  query,
}: {
  reports: ReportsCardType[];
  query: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [reportId, setReportId] = useState("");
  const name = reports.find((report) => report.id === reportId)?.name;
  const deleteReportWithId = deleteReport.bind(null, reportId);
  console.log(reports);
  if (query && reports.length === 0) {
    return (
      <div className="flex flex-grow justify-center items-center text-[24px]">
        No hay coincidencias con la búsqueda: {query}
      </div>
    );
  }

  if (!reports?.length) {
    return (
      <div className="flex flex-grow justify-center items-center">
        No hay informes creados
      </div>
    );
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Delete report", name);
    const whitespaceRemoved = name?.replace(/\s/g, "");
    await fetch(`/api/deleteReportAssets?report=${whitespaceRemoved}`, {
      method: "POST",
    });
    await deleteReportWithId();
    setShowModal(false);
  };
  return (
    <>
      <div className="bg-white flex flex-col gap-4  mt-6">
        {reports &&
          reports?.map((report) => (
            <div key={report.id}>
              <ReportsCard
                id={report.id}
                name={report.name}
                templateName={report.select_template}
                setReportId={setReportId}
                setShowModal={setShowModal}
              />
            </div>
          ))}
      </div>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
      >
        ¿Estás seguro de eliminar el reporte{" "}
        <span className="font-medium">{name}</span>?
      </ConfirmModal>
    </>
  );
}
