"use client";
import Image from "next/image";
import clientsOver from "@/public/help/clients/clients-over 1.png";
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
            "p-5 rounded-2xl lg:flex justify-between items-center w-full transition",
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
            Clientes
          </h3>
        </div>
        <div
          className={clsx(
            "relative h-max overflow-auto p-5 rounded-2xl w-full flex-grow flex flex-col transition",
            {
              "bg-dark-dark-background-panels": isDark,
              "bg-white": !isDark,
              "text-primary-text-500": !isDark,
              "text-white": isDark,
            }
          )}
        >
          <div>
            <h3 className="text-[28px] font-semibold mb-6">Introducción</h3>
            <p className="text-[18px]">
              Visualiza de forma clara y precisa los clientes activos de tu
              empresa, lleva un control de tus clientes conociendo el monto de
              los planes.
            </p>
          </div>
          <div className=" mt-10">
            <Image
              src={clientsOver}
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
          <div className="mt-16 flex w-full justify-between">
            <Link
              href="/dashboard/help/reports/attach"
              className="flex items-center"
            >
              <div className="w-4">
                <ChevronLeftIcon />
              </div>
              <div className="text-[18px] font-semibold">Adjuntar Reportes</div>
            </Link>
            <Link
              href="/dashboard/help/clients/create"
              className="flex items-center"
            >
              <div className="text-[18px] font-semibold">Crear Clientes</div>
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
