"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useStore } from "../lib/store";
import clsx from "clsx";

export default function LogoutButtonUi() {
  const { isDark } = useStore();
  return (
    <button
      className={clsx(
        "flex w-full items-center justify-center gap-2  p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3 transition",
        {
          "bg-white": !isDark,
          "bg-dark-dark-background-panels": isDark,
          "text-dark-dark-text": isDark,
          "hover:bg-dark-dark-background-card": isDark,
          "hover:text-dark-dark-text": isDark,
          "hover:bg-green-100": !isDark,
        }
      )}
    >
      <ArrowLeftIcon className="w-6" />
      <div className="hidden md:block">Cerrar sesión</div>
    </button>
  );
}
