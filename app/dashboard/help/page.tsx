"use client";
import { useStore } from "@/app/lib/store";
import { IntroductionCard } from "@/app/ui/help/introductionCard";
import {
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

const helpRoutesLabel = [
  {
    label: "Plantillas",
    icon: RectangleGroupIcon,
    href: "/dashboard/help/templates/introduction",
  },
  {
    label: "Informes",
    icon: ClipboardDocumentListIcon,
    href: "/dashboard/help/reports/introduction",
  },
  {
    label: "Clientes",
    icon: UserGroupIcon,
    href: "/dashboard/help/clients/introduction",
  },
  {
    label: "Clientes Potenciales",
    icon: UsersIcon,
    href: "/dashboard/help/potential-clients/introduction",
  },
  {
    label: "Usuarios",
    icon: UserIcon,
    href: "/dashboard/help/users/introduction",
  },
];

export default function Page() {
  const { isDark } = useStore();
  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div
          className={clsx(
            "p-5 rounded-2xl lg:flex justify-between items-center w-full transition",
            {
              "bg-dark-dark-background-panels": isDark,
              "bg-white": !isDark,
            }
          )}
        >
          <h3
            className={clsx("text-title font-medium transition", {
              "text-primary-text-500": !isDark,
              "text-white": isDark,
            })}
          >
            Documentación
          </h3>
        </div>
        <div
          className={clsx(
            "relative h-max overflow-auto p-5 rounded-2xl w-full flex-grow flex flex-col transition",
            {
              "bg-dark-dark-background-panels": isDark,
              "bg-white": !isDark,
              "text-primary-text-500": !isDark,
              "text-white": isDark,
            }
          )}
        >
          <div>
            <h3 className="text-[28px] font-semibold mb-6">Introducción</h3>
            <p className="text-[18px]">
              La aplicación web app.gustavoliver.com, es una aplicación SEO
              manager donde podrás crear informes de SEO, además, también podrás
              llevar un control de clientes activos de tu empresa, poder
              visualizar clientes potenciales.{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            {helpRoutesLabel.map((route) => {
              const Icon = route.icon;
              return (
                <Link href={route.href} key={route.label}>
                  <IntroductionCard route={route.label}>
                    <div className="w-10">
                      <Icon />
                    </div>
                  </IntroductionCard>
                </Link>
              );
            })}
          </div>
          <div className="mt-16 flex w-full justify-end">
            <Link
              href="/dashboard/help/templates/introduction"
              className="flex items-center"
            >
              <div className="text-[18px] font-semibold">Plantillas</div>
              <div className="w-4">
                <ChevronRightIcon />
              </div>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
