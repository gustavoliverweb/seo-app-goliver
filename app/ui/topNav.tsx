"use client";
import clsx from "clsx";
import { useStore } from "../lib/store";
import ChangeTheme from "./changeTheme";
import Search from "./search";

export default function TopNav() {
  const { isDark } = useStore();
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-between gap-2  md:flex-row bg-white p-5 transition",
        {
          "bg-dark-dark-background-panels": isDark,
          "bg-white": !isDark,
        }
      )}
    >
      <Search />
      <ChangeTheme />
    </div>
  );
}
