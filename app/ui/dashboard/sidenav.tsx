"use client";
import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { GoLogoBlack } from "@/app/ui/lar-logo";
import { GoLogoWhite } from "@/app/ui/lar-logo";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Avatar } from "../avatar";
import { useRef, useState } from "react";
import clsx from "clsx";
import { useStore } from "@/app/lib/store";

export default function SideNav({ children }: { children: React.ReactNode }) {
  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { isDark } = useStore();

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div
      className={clsx("flex h-full flex-col rounded-br-2xl transition", {
        "bg-white": !isDark,
        "bg-dark-dark-background-panels": isDark,
      })}
    >
      <div className="flex justify-between items-center">
        <Link
          className="flex justify-start rounded-md px-4 py-2 md:h-40"
          href="/"
        >
          <div className="w-40 text-text-opacity-500  md:w-40">
            {isDark ? <GoLogoWhite /> : <GoLogoBlack />}
            <div className="text-[0.875rem] text-center">
              Herramienta de SEO
            </div>
          </div>
        </Link>
        <Avatar />
      </div>
      <div
        ref={menuRef}
        onClick={handleMenu}
        className="flex p-3 items-center gap-2 cursor-pointer "
      >
        <div
          className={clsx("w-4 md:hidden transition", {
            "rotate-90": openMenu,
          })}
        >
          <ChevronRightIcon />
        </div>
        <p className="text-[18px] font-medium md:hidden">Menu</p>
      </div>
      <div
        className={clsx(
          "md:flex grow justify-between flex-col md:space-x-0 md:space-y-2 overflow-auto lg:rounded-br-2xl",
          {
            flex: openMenu,
            hidden: !openMenu,
          }
        )}
      >
        <div>
          <NavLinks />
        </div>
        {children}
      </div>
    </div>
  );
}
