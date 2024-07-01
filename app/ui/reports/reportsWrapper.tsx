/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { ReportsCard } from "./reportsCard";
import { useState } from "react";
import ConfirmModal from "../confirmModal";
import { deleteReport } from "@/app/lib/actions";
import { ReportsCardType } from "@/app/lib/definitions";
import { CreateReport } from "../buttons";
import Pagination from "../pagination";
import clsx from "clsx";
import { useStore } from "@/app/lib/store";

export default function ReportsWrapper({
  reports,
  reportsPages,
  query,
}: {
  reports: ReportsCardType[];
  query: string;
  reportsPages: number;
}) {
  const { isDark, setIsModalDeleteShow } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [reportId, setReportId] = useState("");
  const name = reports.find((report) => report.id === reportId)?.name;
  const deleteReportWithId = deleteReport.bind(null, reportId);
  console.log(reports);
  if (query && reports.length === 0) {
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
            Informes
          </h3>
          <CreateReport />
        </div>
        <div
          className={clsx(
            "h-max overflow-auto p-5 rounded-2xl w-full flex-grow flex flex-col justify-between transition",
            {
              "bg-white": !isDark,
              "bg-dark-dark-background-panels": isDark,
            }
          )}
        >
          <div className="flex flex-1 justify-center items-center text-[24px] flex-col gap-4 ">
            No hay coincidencias con la búsqueda: {query}
          </div>
        </div>
      </div>
    );
  }

  if (!reports?.length) {
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
            Informes
          </h3>
          <CreateReport />
        </div>
        <div
          className={clsx(
            "h-max overflow-auto p-5 rounded-2xl w-full flex-grow flex flex-col justify-between transition",
            {
              "bg-white": !isDark,
              "bg-dark-dark-background-panels": isDark,
            }
          )}
        >
          <div className="flex flex-1 justify-center items-center text-[24px] flex-col gap-4 ">
            No hay informes creados
          </div>
        </div>
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
    setIsModalDeleteShow(false);
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
          Informes
        </h3>
        <CreateReport />
      </div>
      <div
        className={clsx(
          "h-max overflow-auto p-5 rounded-2xl w-full flex-grow flex flex-col justify-between transition",
          {
            "bg-white": !isDark,
            "bg-dark-dark-background-panels": isDark,
          }
        )}
      >
        <div className="flex flex-col gap-4 ">
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

        <div className="mt-5 flex w-full ">
          <Pagination totalPages={reportsPages} />
        </div>
      </div>
    </div>
  );
}
