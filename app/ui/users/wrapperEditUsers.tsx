"use client";
import { UserType } from "@/app/lib/definitions";
import EditUserForm from "./editUserForm";
import { useStore } from "@/app/lib/store";
import clsx from "clsx";

export default function WrapperEditUsers({ user }: { user: UserType }) {
  const { isDark } = useStore();

  return (
    <main>
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
            Editar usuario
          </h3>
        </div>
        <div
          className={clsx(
            " h-max overflow-auto p-5 mb-6 rounded-2xl w-full flex-grow flex flex-col justify-between transition",
            {
              "bg-white": !isDark,
              "bg-dark-dark-background-panels": isDark,
            }
          )}
        >
          <EditUserForm user={user} />
        </div>
      </div>
    </main>
  );
}
