"use client";
import Link from "next/link";
import { GoLogoBlack } from "@/app/ui/lar-logo";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Avatar } from "../avatar";
import NavLinksDocs from "./nav-links-docs";
import { useRef, useState } from "react";
import clsx from "clsx";

export default function DocsSideNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
    console.log(menuRef.current);
  };
  return (
    <div className="flex h-full flex-col bg-white rounded-br-2xl">
      <div className="flex justify-between items-center">
        <Link
          className="flex justify-start rounded-md px-4 py-2 md:h-40"
          href="/"
        >
          <div className="w-40 text-text-opacity-500  md:w-40">
            <GoLogoBlack />
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
          "md:flex grow justify-between flex-col md:space-x-0 md:space-y-2 overflow-auto",
          {
            flex: openMenu,
            hidden: !openMenu,
          }
        )}
      >
        <div>
          <NavLinksDocs />
        </div>
        {children}
      </div>
    </div>
  );
}