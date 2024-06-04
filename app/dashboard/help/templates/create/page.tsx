"use client";
import Image from "next/image";
import templateCreateButton from "@/public/help/templates/template-create-button 1.png";
import templateCreateForm from "@/public/help/templates/template-create 2.png";
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
            Plantillas
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
              Creación de plantillas
            </h3>
            <p className="text-[18px]">
              Esta página te guiará en el proceso de creación de plantillas de
              informes.
            </p>
          </div>
          <div className=" mt-10">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-[24px] mb-2">Como crear plantillas</h4>
                <p className="text-[18px] font-semibold mb-6">
                  1. Haz click en el botón Nueva agencia
                </p>
                <Image
                  src={templateCreateButton}
                  alt=""
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[18px] font-semibold ">
                  2. Llena el formulario con los datos de la agencia y guarda
                  los ajustes
                </p>
                <div>
                  <p className="text-[18px] font-semibold">
                    Datos obligatorios
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 list-disc pl-4">
                    <li>Nombre de la agencia</li>
                    <li>Logo de tipo color</li>
                    <li>Logo de tipo blanco</li>
                  </ul>
                </div>
                <Image
                  src={templateCreateForm}
                  alt=""
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          <div className="mt-16 flex w-full justify-between">
            <Link
              href="/dashboard/help/templates/introduction"
              className="flex items-center"
            >
              <div className="w-4">
                <ChevronLeftIcon />
              </div>
              <div className="text-[18px] font-semibold">Plantillas</div>
            </Link>
            <Link
              href="/dashboard/help/reports/introduction"
              className="flex items-center"
            >
              <div className="text-[18px] font-semibold">Informes</div>
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
