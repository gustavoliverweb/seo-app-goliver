"use client";

import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useStore } from "@/app/lib/store";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Agencias", href: "/dashboard", icon: HomeIcon },
  {
    name: "Informes",
    href: "/dashboard/reports",
    icon: ClipboardDocumentListIcon,
  },
  { name: "Clientes", href: "/dashboard/clients", icon: UserGroupIcon },
  {
    name: "Clientes potenciales",
    href: "/dashboard/potential-customer",
    icon: UsersIcon,
  },
  { name: "Usuarios", href: "/dashboard/users", icon: UserIcon },
  { name: "Ayuda", href: "/dashboard/help", icon: InformationCircleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { isDark } = useStore();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center  gap-2 rounded-mdp-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 transition",
              {
                "text-primary-button-500": pathname === link.href,
                "bg-gray-50": !isDark,
                "bg-dark-dark-background-panels": isDark,
                "text-white": isDark && pathname !== link.href,
                "hover:text-dark-dark-text": isDark && pathname !== link.href,
                "hover:bg-green-100": !isDark && pathname !== link.href,
                "hover:bg-dark-dark-background-card":
                  isDark && pathname !== link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
