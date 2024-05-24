/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { createPotentialCustomer } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import PotentialCustomerStatusWrapper from "./potentialCustomerStatusWrapper";
import { ramdomSecureId } from "@/app/lib/utils";
import { useStore } from "@/app/lib/store";
import clsx from "clsx";

export default function CreatePotentialCustomerForm() {
  const initialState = {
    id: "",
    name: "Cliente",
    status: "open",
    paid_amount: 0,
    paid_type: "monthly" as "monthly" | "punctual",
  };
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
    setCustomers,
    isSendForm,
    setSendForm,
    setShowCreateClient,
    customersData,
    isDark,
  } = useStore();
  const [createClient, setCreateClient] = useState(initialState);

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSendForm) setSendForm(false);
    // console.log(id);
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
    setCreateClient((prev) => ({
      ...prev,
      paid_type: e.target.value as "monthly" | "punctual",
    }));
    setSendForm(true);
  };

  const accessToPaidTypeObject = (str: keyof typeof labelPaidType) => {
    return labelPaidType[str];
  };

  useEffect(() => {
    if (isSendForm) {
      const delaySendData = setTimeout(() => {
        const ramdomId = ramdomSecureId();
        const customerWithIdObject = {
          ...createClient,
          id: ramdomId,
        };
        setSendForm(false);
        createPotentialCustomer(customerWithIdObject);
        setShowCreateClient(false);
        setCustomers([customerWithIdObject, ...customersData]);
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
            <span>Pago/{accessToPaidTypeObject(createClient.paid_type)}:</span>{" "}
            $
            <div className="w-16">
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
                  defaultValue={createClient.status}
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
                  defaultValue={createClient.paid_type}
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
    </form>
  );
}
