"use client";
import clsx from "clsx";
import { useStore } from "../lib/store";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function ChangeTheme({ className }: { className: string }) {
  const { setIsDark, isDark } = useStore();
  const handleThemeChange = () => {
    setIsDark(!isDark);
  };
  return (
    <div
      onClick={handleThemeChange}
      className={clsx(
        "justify-start border border-gray-200 w-[58px] p-1 rounded-full cursor-pointer",
        className
      )}
    >
      <div
        className={clsx("w-6 h-6 rounded-full transition", {
          "translate-x-full": isDark,
          "text-dark-dark-text": isDark,
        })}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </div>
    </div>
  );
}
