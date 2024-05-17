import { IntroductionCard } from "@/app/ui/help/introductionCard";
import {
  ClipboardDocumentListIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const helpRoutesLabel = [
  { label: "Plantillas", icon: RectangleGroupIcon },
  { label: "Informes", icon: ClipboardDocumentListIcon },
  { label: "Clientes", icon: UserGroupIcon },
  { label: "Clientes Potenciales", icon: UsersIcon },
  { label: "Usuarios", icon: UserIcon },
];

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div className="bg-white p-5 rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title text-primary-text-500 font-medium">
            Documentación
          </h3>
        </div>
        <div className="relative h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col">
          <div>
            <h3>Introducción</h3>
            <p>
              La aplicación web app.gustavoliver.com, es una aplicación SEO
              manager donde podrás crear informes de SEO, además, también podrás
              llevar un control de clientes activos de tu empresa, poder
              visualizar clientes potenciales.{" "}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-12">
            {helpRoutesLabel.map((route, index) => {
              const Icon = route.icon;
              return (
                <IntroductionCard key={index} route={route.label}>
                  <div className="w-10">
                    <Icon />
                  </div>
                </IntroductionCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
