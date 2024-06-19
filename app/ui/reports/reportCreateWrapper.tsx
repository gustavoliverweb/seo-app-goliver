/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { AgencyTemplate, UserType } from "@/app/lib/definitions";
import { useStore } from "@/app/lib/store";
import SendReportForm from "@/app/ui/reports/sendReportForm";
import clsx from "clsx";

export default function ReportCreateWrapper({
  templateData,
  users,
}: {
  templateData: AgencyTemplate[] | undefined;
  users: UserType[] | undefined;
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
          Nuevo informe
        </h3>
      </div>
      <div
        className={clsx(
          "w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-2  h-max overflow-auto  rounded-2xl transition",
          {
            "bg-[#f0f1f3]": !isDark,
            "bg-dark-dark-background": isDark,
          }
        )}
      >
        <SendReportForm templateData={templateData} users={users} />
      </div>
    </div>
  );
}
