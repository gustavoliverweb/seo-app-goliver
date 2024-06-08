"use client";
import { createPotentialCustomer } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import PotentialCustomerStatusWrapper from "./potentialCustomerStatusWrapper";
import { Customer } from "@/app/lib/definitions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/app/lib/store";
import clsx from "clsx";

export default function EditPotentialCustomerForm({
  customers,
  setShowModal,
  setPotentialCustomerId,
}: {
  customers: Customer;
  setShowModal: (showModal: boolean) => void;
  setPotentialCustomerId: (clientId: string) => void;
}) {
  const stateClient = [
    { status: "open", label: "Abierto" },
    { status: "proposal", label: "Propuesta" },
    { status: "lost", label: "Perdido" },
    { status: "won", label: "Ganado" },
  ];
  const paidTypeClient = [
    { type: "monthly", label: "Mensual" },
    { type: "punctual", label: "Puntual" },
  ];
  const labelPaidType = {
    monthly: "Mensual",
    punctual: "Puntual",
  };

  const {
    isSendForm,
    setSendForm,
    setCustomers,
    customersData,
    isDark,
    setIsModalDeleteShow,
  } = useStore();

  const [createClient, setCreateClient] = useState(customers);

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSendForm) setSendForm(false);
    setCreateClient((prev) => ({ ...prev, name: e.target.value }));
    setSendForm(true);
  };

  const handlePaidAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSendForm) setSendForm(false);
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setCreateClient((prev) => ({
      ...prev,
      paid_amount: value as number,
    }));

    setSendForm(true);
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isSendForm) setSendForm(false);
    setCreateClient((prev) => ({ ...prev, status: e.target.value }));
    setSendForm(true);
  };

  const handleChangePaidType = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (isSendForm) setSendForm(false);
    setCreateClient((prev) => ({ ...prev, paid_type: e.target.value }));
    setSendForm(true);
  };

  const accessToPaidTypeObject = (str: keyof typeof labelPaidType) => {
    return labelPaidType[str];
  };

  const handleDeletePotentialCustomer = () => {
    console.log("Delete potential customer edit form", customers);
    setShowModal(true);
    setPotentialCustomerId(customers.id);
    setIsModalDeleteShow(true);
  };

  useEffect(() => {
    if (isSendForm) {
      const delaySendData = setTimeout(() => {
        console.log("customerData", createClient);
        setSendForm(false);
        createPotentialCustomer(createClient);
        setCreateClient(createClient);
        const isObjectExist = customersData.find(
          (data) => data.id === createClient.id
        );
        console.log(isObjectExist);
        const newCustomersData = customersData.map((customer) => {
          if (customer.id === isObjectExist?.id) {
            return createClient;
          } else {
            return customer;
          }
        });
        console.log(newCustomersData);
        setCustomers(newCustomersData);
      }, 500);
      return () => clearTimeout(delaySendData);
    }
  }, [createClient]);

  return (
    <form>
      <div className="w-full flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <input
              className={clsx(
                "w-full border border-gray-200 rounded-md text-ellipsis transition",
                {
                  "bg-dark-dark-background-panels": isDark,
                  "border-dark-dark-border": isDark,
                  "text-dark-dark-text": isDark,
                }
              )}
              onChange={handleClientNameChange}
              value={createClient?.name}
            />
          </div>
          <div
            className={clsx("text-[14px] flex gap-2 items-center transition", {
              "text-dark-dark-text": isDark,
            })}
          >
            <span>
              Pago/
              <span className="font-semibold">
                {accessToPaidTypeObject(
                  createClient.paid_type as "monthly" | "punctual"
                )}
              </span>
              :
            </span>{" "}
            $
            <div className="w-20">
              <input
                type="number"
                className={clsx(
                  "w-full h-8 border border-gray-200 rounded-md transition",
                  {
                    "bg-dark-dark-background-panels": isDark,
                    "border-dark-dark-border": isDark,
                  }
                )}
                onChange={handlePaidAmount}
                value={createClient?.paid_amount}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row gap-4 items-center">
          <PotentialCustomerStatusWrapper customer={createClient} />

          <div className="w-full flex flex-row gap-2 justify-between lg:gap-2">
            <div className="w-full relative mt-2 lg:mt-0 rounded-md">
              <div className="relative">
                <select
                  id="select-template"
                  onChange={handleChangeStatus}
                  name="select-template"
                  aria-describedby="select-template-error"
                  className={clsx(
                    "w-full xl:w-fit rounded-md  border border-gray-200 pl-4 pr-10 py-2 transition",
                    {
                      "bg-dark-dark-background-panels": isDark,
                      "border-dark-dark-border": isDark,
                      "text-dark-dark-text": isDark,
                    }
                  )}
                  value={createClient.status}
                >
                  <option>Estado</option>
                  {stateClient.map((state) => (
                    <option key={state.status} value={state.status}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full relative mt-2 lg:mt-0 rounded-md">
              <div className="relative">
                <select
                  id="select-template"
                  onChange={handleChangePaidType}
                  name="select-template"
                  aria-describedby="select-template-error"
                  className={clsx(
                    "w-full xl:w-fit rounded-md  border border-gray-200 pl-4 pr-10 py-2 transition",
                    {
                      "bg-dark-dark-background-panels": isDark,
                      "border-dark-dark-border": isDark,
                      "text-dark-dark-text": isDark,
                    }
                  )}
                  value={createClient.paid_type}
                >
                  <option>Pago</option>
                  {paidTypeClient.map((type) => (
                    <option key={type.type} value={type.type}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[4px] right-[4px]">
        <div
          className=" flex text-white items-center rounded-full p-1  bg-secondary-green-500 cursor-pointer hover:bg-green-600 transition-colors"
          onClick={handleDeletePotentialCustomer}
        >
          {<XMarkIcon className="h-4 w-4 " />}
        </div>
      </div>
    </form>
  );
}
