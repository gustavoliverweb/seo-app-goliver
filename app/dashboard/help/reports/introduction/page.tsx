import Image from "next/image";
import reportsOver from "@/public/help/reports/reports-over 1.png";

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
            Informes
          </h3>
        </div>
        <div className="relative h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col">
          <div>
            <h3 className="text-[28px] font-semibold mb-6">Introducción</h3>
            <p className="text-[18px]">
              Los informes o auditorías SEO se conforman por una serie de datos
              de determinada empresa, el cual puede incluir informes técnicos
              detallados como el posicionamiento SEO de la empresa,
              clasificaciones de las palabras clave del sitio web de la empresa,
              tráfico de búsquedas, informes de palabras clave, análisis de la
              competencia y más.
            </p>
          </div>
          <div className=" mt-10">
            <Image
              src={reportsOver}
              alt=""
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
