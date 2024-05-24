"use client";
import { useStore } from "@/app/lib/store";
import CreateAgencyForm from "@/app/ui/agency/createAgencyForm";
import clsx from "clsx";

export default function Page() {
  const { isDark } = useStore();
  return (
    <main>
      <div className="items-start justify-between mt-6">
        <div
          className={clsx(
            "p-5 md:mr-5 md:ml-5 rounded-2xl lg:flex justify-between items-center transition",
            {
              "bg-dark-dark-background-panels": isDark,
              "bg-white": !isDark,
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
            Crear plantilla
          </h3>
        </div>
        <div
          className={clsx(
            "relative h-max overflow-auto mt-6 p-5 md:mr-5 md:ml-5 mb-6 rounded-2xl transition",
            {
              "bg-white": !isDark,
              "bg-dark-dark-background-panels": isDark,
            }
          )}
        >
          <CreateAgencyForm />
        </div>
      </div>
    </main>
  );
}
