"use client";

import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useStore } from "@/app/lib/store";
import { useState } from "react";

const links = [
  {
    name: "Introducción",
    href: "/dashboard/help",
    icon: HomeIcon,
  },
  {
    name: "Plantillas",
    href: "",
    icon: ClipboardDocumentListIcon,
    subLinks: [
      { name: "Introducción", href: "/dashboard/help/templates/introduction" },
      { name: "Crear Plantillas", href: "/dashboard/help/templates/create" },
    ],
  },
  {
    name: "Informes",
    href: "",
    icon: UserGroupIcon,
    subLinks: [
      { name: "Introducción", href: "/dashboard/help/reports/introduction" },
      { name: "Crear Informes", href: "/dashboard/help/reports/create" },
      { name: "Adjuntar Reportes", href: "/dashboard/help/reports/attach" },
    ],
  },
  {
    name: "Clientes",
    href: "",
    icon: UserGroupIcon,
    subLinks: [
      { name: "Introducción", href: "/dashboard/help/clients/introduction" },
      { name: "Crear Clientes", href: "/dashboard/help/clients/create" },
    ],
  },
  {
    name: "Clientes Potenciales",
    href: "",
    icon: UserGroupIcon,
    subLinks: [
      {
        name: "Introducción",
        href: "/dashboard/help/potential-customers/introduction",
      },
      {
        name: "Crear Clientes Potenciales",
        href: "/dashboard/help/potential-customers/create",
      },
    ],
  },
  {
    name: "Usuarios",
    href: "",
    icon: UserGroupIcon,
    subLinks: [
      {
        name: "Introducción",
        href: "/dashboard/help/users/introduction",
      },
      {
        name: "Crear Usuarios",
        href: "/dashboard/help/users/create",
      },
    ],
  },
];

export default function NavLinksDocs() {
  const pathname = usePathname();
  const { isDark } = useStore();
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);

  const handleSubMenu = (e: React.MouseEvent<HTMLElement>) => {
    setOpenSubMenu(!openSubMenu);
    const target = (e.target as HTMLElement).closest(".parent-menu");
    const menuChild = (e.target as HTMLElement).closest(".menu-child");
    if (menuChild) return;
    if (target) {
      target.classList.toggle("active");
    }
  };

  return (
    <>
      {links.map((link) => {
        const property = "subLinks" in link;
        {
          return !property ? (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center  gap-2 rounded-mdp-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ",
                {
                  "text-primary-button-500": pathname === link.href,
                  "bg-dark-dark-background-panels": isDark,
                  "text-white": isDark && pathname !== link.href,
                  "hover:text-dark-dark-text": isDark && pathname !== link.href,
                  "hover:bg-green-100": !isDark && pathname !== link.href,
                  "hover:bg-dark-dark-background-card":
                    isDark && pathname !== link.href,
                }
              )}
            >
              <p className={""}>{link.name}</p>
            </Link>
          ) : (
            <>
              <div
                onClick={handleSubMenu}
                className="parent-menu gap-2 cursor-pointer"
                data-parent={link.name}
              >
                <div
                  className={clsx(
                    "flex h-[48px] grow items-center gap-2 rounded-mdp-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ",
                    {
                      "text-primary-button-500": pathname === link.href,
                      "bg-dark-dark-background-panels": isDark,
                      "text-white": isDark && pathname !== link.href,
                      "hover:text-dark-dark-text":
                        isDark && pathname !== link.href,
                      "hover:bg-green-100": !isDark && pathname !== link.href,
                      "hover:bg-dark-dark-background-card":
                        isDark && pathname !== link.href,
                    }
                  )}
                >
                  <p>{link.name}</p>
                  {
                    <div className="parent-icon-sub-menu w-4 transition">
                      <ChevronRightIcon />
                    </div>
                  }
                </div>
                <div className="menu-child">
                  {link.subLinks?.map((sunlinks) => (
                    <Link
                      key={sunlinks.name}
                      href={sunlinks.href}
                      className={clsx(
                        "flex h-[48px] grow items-center  gap-2 rounded-mdp-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ",
                        {
                          "text-primary-button-500": pathname === link.href,
                          "bg-dark-dark-background-panels": isDark,
                          "text-white": isDark && pathname !== link.href,
                          "hover:text-dark-dark-text":
                            isDark && pathname !== link.href,
                          "hover:bg-green-100":
                            !isDark && pathname !== link.href,
                          "hover:bg-dark-dark-background-card":
                            isDark && pathname !== link.href,
                        }
                      )}
                    >
                      <p className=" p-2">{sunlinks.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          );
        }
      })}
    </>
  );
}
