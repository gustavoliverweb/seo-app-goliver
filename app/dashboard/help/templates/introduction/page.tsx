import Image from "next/image";
import templateOver from "@/public/help/templates/template-over 1.png";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default async function Page() {
  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div className="bg-white p-5 rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title text-primary-text-500 font-medium">
            Plantillas
          </h3>
        </div>
        <div className="relative h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col">
          <div>
            <h3 className="text-[28px] font-semibold mb-6">Introducción</h3>
            <p className="text-[18px]">
              Las plantillas de informes es el punto de partida para comenzar a
              crear infomes SEO, podrás crear muchos informes a partir de una
              plantilla previamente creada.
            </p>
          </div>
          <div className=" mt-10">
            <Image
              src={templateOver}
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
          <div className="mt-16 flex w-full justify-between">
            <Link
              href="/dashboard/help/templates/introduction"
              className="flex items-center"
            >
              <div className="w-4">
                <ChevronLeftIcon />
              </div>
              <div className="text-[18px] font-semibold">Introducción</div>
            </Link>
            <Link
              href="/dashboard/help/templates/create"
              className="flex items-center"
            >
              <div className="text-[18px] font-semibold">Crear Plantillas</div>
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
