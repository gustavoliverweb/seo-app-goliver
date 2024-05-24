"use client";
import { useStore } from "@/app/lib/store";
import CreateClientForm from "@/app/ui/clients/createClientForm";
import clsx from "clsx";

type Agency = {
  agency_name: string;
};

export default function CreateClientWrapper({
  agencyName,
}: {
  agencyName: Agency[];
}) {
  const { isDark } = useStore();

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
          Nuevo cliente
        </h3>
      </div>
      <div
        className={clsx(
          "relative h-max w-full overflow-auto p-5 rounded-2xl transition",
          {
            "bg-white": !isDark,
            "bg-dark-dark-background-panels": isDark,
            "text-dark-dark-text": isDark,
          }
        )}
      >
        <CreateClientForm agencys={agencyName} />
      </div>
    </div>
  );
}
