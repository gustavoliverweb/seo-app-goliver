"use client";
import Image from "next/image";
import attachReport from "@/public/help/reports/report-attach 1.png";
import attachReportCoverPdfTecnical from "@/public/help/reports/attach-report 3.png";
import attachReportSemrushPdfKeyword from "@/public/help/reports/attach-report2 1.png";
import createPdf from "@/public/help/reports/create-pdf 1.png";
import downPdf from "@/public/help/reports/down-pdf 1.png";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useStore } from "@/app/lib/store";

export default function Page() {
  const { isDark } = useStore();
  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div
          className={clsx(
            "p-5 rounded-2xl lg:flex justify-between items-center w-full",
            {
              "bg-dark-dark-background-panels": isDark,
              "bg-white": !isDark,
            }
          )}
        >
          <h3
            className={clsx("text-title font-medium transition", {
              "text-primary-text-500": !isDark,
              "text-white": isDark,
            })}
          >
            Informes
          </h3>
        </div>
        <div
          className={clsx(
            "relative h-max overflow-auto p-5 rounded-2xl w-full flex-grow flex flex-col",
            {
              "bg-dark-dark-background-panels": isDark,
              "bg-white": !isDark,
              "text-primary-text-500": !isDark,
              "text-white": isDark,
            }
          )}
        >
          <div>
            <h3 className="text-[28px] font-semibold mb-6">
              Adjuntar reportes
            </h3>
            <p className="text-[18px]">
              Esta página te guiará en el proceso de adjuntar reportes técnicos,
              reportes de keywords, semrush e imágenes a tus informes.
            </p>
          </div>
          <div className=" mt-10">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-[24px] mb-2">Como adjuntar reportes</h4>
                <p className="text-[18px] font-semibold mb-6">
                  1. Haz click en el botón adjuntar
                </p>
                <Image
                  src={attachReport}
                  alt=""
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[18px] font-semibold ">
                  2. Adjunta una imagen de portada, un reporte técnico (PDF)
                </p>
                <div>
                  <Image
                    src={attachReportCoverPdfTecnical}
                    alt=""
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-[18px] font-semibold ">
                    3. Adjunta un reporte de Keywords (PDF), imágenes de semrush
                  </p>

                  <Image
                    src={attachReportSemrushPdfKeyword}
                    alt=""
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-[18px] font-semibold ">
                    4. Haz click en el botón generar PDF
                  </p>

                  <Image
                    src={createPdf}
                    alt=""
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[18px]">
                      Comenzará el proceso de creación del PDF , este proceso
                      puedo tomar algunos minutos dependiendo del tamaño del
                      archivo PDF.
                    </p>
                    <p className="text-[18px]">
                      Al finalizar el proceso, podrás descargar el archivo y
                      también enviar el archivo por correo.
                    </p>
                  </div>
                  <Image
                    src={downPdf}
                    alt=""
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 flex w-full justify-between">
            <Link
              href="/dashboard/help/reports/create"
              className="flex items-center"
            >
              <div className="w-4">
                <ChevronLeftIcon />
              </div>
              <div className="text-[18px] font-semibold">Crear Informes</div>
            </Link>
            <Link
              href="/dashboard/help/clients/introduction"
              className="flex items-center"
            >
              <div className="text-[18px] font-semibold">Clientes</div>
              <div className="w-4">
                <ChevronRightIcon />
              </div>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
