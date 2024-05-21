import Image from "next/image";
import createPotentialCustomerButton from "@/public/help/potential-customer/potential-customer-create 1.png";
import createPotentialCustomerCard from "@/public/help/potential-customer/potential-customer-create-default-card 1.png";

export default async function Page() {
  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div className="bg-white p-5 rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title text-primary-text-500 font-medium">
            Clientes Potenciales
          </h3>
        </div>
        <div className="relative h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col">
          <div>
            <h3 className="text-[28px] font-semibold mb-6">
              Creación de clientes potenciales
            </h3>
            <p className="text-[18px]">
              Esta página te guiará en el proceso de creación de clientes
              potenciales.
            </p>
          </div>
          <div className=" mt-10">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-[24px] mb-2">
                  Como crear clientes potenciales
                </h4>
                <p className="text-[18px] font-semibold mb-6">
                  1. Haz click en el botón más
                </p>
                <Image
                  src={createPotentialCustomerButton}
                  alt=""
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[18px] font-semibold ">
                  2. Aparecerá una tarjeta de cliente potencial por defecto
                </p>
                <div>
                  <p className="text-[18px] font-semibold">
                    En esta tarjeta puedes:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 list-disc pl-4">
                    <li>Introducir el nombre del cliente potencial</li>
                    <li>
                      El estado del cliente potencial:
                      <div>E.g. Abierto, Ganado, Perdido, Propuesta</div>
                    </li>
                    <li>
                      Tipo de pago:
                      <div>E.g. Mensual o Puntual</div>
                    </li>
                    <li>Monto del pago</li>
                  </ul>
                </div>
                <Image
                  src={createPotentialCustomerCard}
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
      </div>
    </div>
  );
}
