"use client";

import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    name: "Introducción",
    href: "/dashboard/help/introduction",
    icon: HomeIcon,
  },
  {
    name: "Plantillas",
    href: "",
    icon: ClipboardDocumentListIcon,
    subLinks: [
      { name: "Introduction", href: "/dashboard/help/templates/introduction" },
      { name: "Crear Plantillas", href: "/dashboard/help/templates/create" },
    ],
  },
  {
    name: "Informes",
    href: "",
    icon: UserGroupIcon,
    subLinks: [
      { name: "Introduction", href: "/dashboard/help/reports/introduction" },
      { name: "Crear Informes", href: "/dashboard/help/reports/create" },
      { name: "Adjuntar Reportes", href: "/dashboard/help/reports/attach" },
    ],
  },
  {
    name: "Clientes",
    href: "",
    icon: UserGroupIcon,
    subLinks: [
      { name: "Introduction", href: "/dashboard/help/clients/introduction" },
      { name: "Crear Clientes", href: "/dashboard/help/clients/create" },
    ],
  },
  {
    name: "Clientes Potenciales",
    href: "",
    icon: UserGroupIcon,
    subLinks: [
      {
        name: "Introduction",
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
        name: "Introduction",
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

  const handleSubMenu = (e: React.MouseEvent<HTMLElement>) => {
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
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100  md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "text-primary-button-500": pathname === link.href,
                }
              )}
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          ) : (
            <>
              <div
                onClick={handleSubMenu}
                className="parent-menu  py-2 px-3 gap-2 cursor-pointer"
                data-parent={link.name}
              >
                <div className="flex items-center">
                  <p>{link.name}</p>
                  {
                    <div className="w-4">
                      <ChevronDownIcon />
                    </div>
                  }
                </div>
                <div className="menu-child">
                  {link.subLinks?.map((sunlinks) => (
                    <Link
                      key={sunlinks.name}
                      href={sunlinks.href}
                      className={clsx(
                        "flex  grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100  md:flex-none md:justify-start md:p-2 md:px-3",
                        {
                          "text-primary-button-500": pathname === sunlinks.href,
                        }
                      )}
                    >
                      <p className="hidden md:block p-2">{sunlinks.name}</p>
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
