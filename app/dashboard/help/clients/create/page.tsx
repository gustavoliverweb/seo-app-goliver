import Image from "next/image";
import createClientButton from "@/public/help/clients/clients-create 1.png";
import createClientForm from "@/public/help/clients/clients-create-form 1.png";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default async function Page() {
  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div className="bg-white p-5 rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title text-primary-text-500 font-medium">
            Clientes
          </h3>
        </div>
        <div className="relative h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col">
          <div>
            <h3 className="text-[28px] font-semibold mb-6">
              Creación de clientes
            </h3>
            <p className="text-[18px]">
              Esta página te guiará en el proceso de creación de clientes.
            </p>
          </div>
          <div className=" mt-10">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-[24px] mb-2">Como crear clientes</h4>
                <p className="text-[18px] font-semibold mb-6">
                  1. Haz click en el botón Nuevo cliente
                </p>
                <Image
                  src={createClientButton}
                  alt=""
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[18px] font-semibold ">
                  2. Llena el formulario con los datos del cliente y haz click
                  en guardar cliente
                </p>
                <div>
                  <p className="text-[18px] font-semibold">
                    Datos obligatorios
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 list-disc pl-4">
                    <li>Nombre de la agencia</li>
                    <li>Nombre del cliente</li>
                    <li>Mensualidad</li>
                    <li>Logo</li>
                  </ul>
                </div>
                <Image
                  src={createClientForm}
                  alt=""
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          <div className="mt-16 flex w-full justify-between">
            <Link
              href="/dashboard/help/clients/introduction"
              className="flex items-center"
            >
              <div className="w-4">
                <ChevronLeftIcon />
              </div>
              <div className="text-[18px] font-semibold">Clientes</div>
            </Link>
            <Link
              href="/dashboard/help/potential-customers/introduction"
              className="flex items-center"
            >
              <div className="text-[18px] font-semibold">
                Clientes Potenciales
              </div>
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
