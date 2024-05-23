"use client";
import { useStore } from "../lib/store";

export default function ChangeTheme() {
  const { setIsDark, isDark } = useStore();
  const handleThemeChange = () => {
    setIsDark(!isDark);
  };
  return (
    <div
      onClick={handleThemeChange}
      className="flex justify-start border border-gray-200 w-16 p-1 rounded-full cursor-pointer"
    >
      <div className="w-6 h-6 bg-slate-500 rounded-full"></div>
    </div>
  );
}
