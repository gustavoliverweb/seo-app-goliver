"use client";
import { createPotentialCustomer } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import PotentialCustomerStatusWrapper from "./potentialCustomerStatusWrapper";
import { Customer } from "@/app/lib/definitions";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
    { status: "open", label: "Abierto", color: "bg-[#e667dc]" },
    { status: "proposal", label: "Propuesta", color: "bg-[#7c7cd3]" },
    { status: "lost", label: "Perdido", color: "bg-[#6F1313]" },
    { status: "won", label: "Ganado", color: "bg-[#4CD88A]" },
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
    // setSendForm(true);
    console.log(e.target);
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

  const handleProbability = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (isSendForm) setSendForm(false);
    setCreateClient((prev) => ({ ...prev, probability: e.target.value }));
    setSendForm(true);
  };

  const handleClickComment = (e: React.MouseEvent<HTMLElement>) => {
    const target = (e.target as HTMLElement).closest(".wrapper-comment");
    target?.classList.toggle("active");
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isSendForm) setSendForm(false);
    setCreateClient((prev) => ({ ...prev, comment: e.target.value }));
    setSendForm(true);
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
      <div className="w-full flex flex-col lg:flex-row justify-between mt-4 lg:mt-0">
        <div className="flex flex-col gap-2">
          <div className="wrapper-comment w-full flex items-center gap-2 relative">
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
            <textarea
              rows={4}
              className="hidden w-full absolute top-11 left-0 border border-gray-200 rounded-md"
              onChange={handleComment}
              value={createClient?.comment}
            ></textarea>
            <div onClick={handleClickComment} className="w-8 cursor-pointer">
              <ChatBubbleOvalLeftEllipsisIcon className="text-gray-600" />
            </div>
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
          <div
            className={clsx("text-[14px] flex gap-2 items-center transition", {
              "text-dark-dark-text": isDark,
            })}
          >
            <span className="font-semibold">Probabilidad:</span>
            <div className="w-[60px]">
              <input
                type="number"
                className={clsx(
                  "w-full h-8 border border-gray-200 rounded-md transition px-2 text-center",
                  {
                    "bg-dark-dark-background-panels": isDark,
                    "border-dark-dark-border": isDark,
                  }
                )}
                onChange={handleProbability}
                value={createClient?.probability}
              />
            </div>
            <span>%</span>
            <div className="w-[100px] overflow-hidden h-8 border border-gray-200 rounded-md transition">
              <span
                style={{ width: `${createClient?.probability}%` }}
                className="block h-full bg-primary-button-500 transition"
              ></span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col xl:flex-row gap-4 items-center justify-end">
          <PotentialCustomerStatusWrapper customer={createClient} />

          <div className="w-full xl:w-fit flex flex-row gap-2 justify-between lg:gap-2">
            <div className="w-full relative mt-2 lg:mt-0 rounded-md">
              <div className="relative">
                <select
                  onChange={handleChangeStatus}
                  name="select-template"
                  aria-describedby="select-template-error"
                  className={clsx(
                    "select-state w-full cursor-pointer xl:w-[150px] h-[42px] rounded-md  border border-gray-200 p-0 pr-8 text-center transition",
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
                    <option
                      key={state.status}
                      value={state.status}
                      className={`${state.color} text-white `}
                    >
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
                    "w-full cursor-pointer xl:w-[150px] h-[42px] rounded-md border border-gray-200 p-0 pr-8 text-center transition",
                    {
                      "bg-dark-dark-background-panels": isDark,
                      "border-dark-dark-border": isDark,
                      "text-dark-dark-text": isDark,
                    }
                  )}
                  value={createClient.paid_type}
                >
                  <option>Tipo de pago</option>
                  {paidTypeClient.map((type) => (
                    <option key={type.type} value={type.type} className="">
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
