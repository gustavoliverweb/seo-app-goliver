/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Customer } from "@/app/lib/definitions";
import { Button } from "../button";
// import Pagination from "../pagination";
import { PotentialCustomerCard } from "./potentialCustomerCard";
import { PotentialCustomerCardDefault } from "./potentialCustomerCardDefault";
import { useEffect } from "react";
import {
  sumSubTotalPotentialCustomer,
  sumTotalPotentialCustomer,
} from "@/app/lib/utils";
import { useStore } from "@/app/lib/store";
import clsx from "clsx";

export default function PotentialCustomerWrapper({
  customers = [],
  query,
}: {
  customers: Customer[];
  query: string;
}) {
  const { isDark } = useStore();
  const { showCreateClient, setShowCreateClient, customersData, setCustomers } =
    useStore();
  useEffect(() => {
    setCustomers(customers);
  }, [query]);

  if (query && customers.length === 0) {
    return (
      <div className="pb-6 flex flex-grow">
        <div className="items-start justify-between mt-6 w-full flex flex-col px-5 gap-6">
          <div
            className={clsx(
              "p-5 rounded-2xl lg:flex justify-between items-center w-full transition",
              {
                "bg-white": !isDark,
                "bg-dark-dark-background-panels": isDark,
              }
            )}
          >
            <h3
              className={clsx(
                "text-title font-medium text-primary-text-500 transition",
                {
                  "text-primary-text-500": !isDark,
                  "text-white": isDark,
                }
              )}
            >
              Clientes potenciales
            </h3>
            <Button
              onClick={() => setShowCreateClient(true)}
              className="w-full lg:w-fit justify-center flex mt-3 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-base  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2"
            >
              +
            </Button>
          </div>
          <div
            className={clsx(
              " p-4 md:p-6 rounded-2xl w-full flex-grow flex flex-col transition",
              {
                "bg-dark-dark-background-panels": isDark,
                "bg-white": !isDark,
              }
            )}
          >
            <div className="flex flex-1 justify-center items-center flex-col gap-4 text-[24px]">
              No hay coincidencias
            </div>
            <div
              className={clsx(
                "relative h-max overflow-auto mt-6 p-2  rounded-2xl w-full",
                {
                  "text-dark-dark-text": isDark,
                  "text-primary-text-500": !isDark,
                }
              )}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold text-[24px]">Total:</div>
                  <div>
                    <div className="font-semibold text-[18px] ">
                      Mensual: 0$
                      <br />
                      Puntual: 0$
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-[24px]">0$</div>
              </div>
              <div className="mt-5 flex w-full "></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start justify-between mt-6 w-full flex flex-col px-5 gap-6">
        <div
          className={clsx(
            "p-5 rounded-2xl lg:flex justify-between items-center w-full transition",
            {
              "bg-white": !isDark,
              "bg-dark-dark-background-panels": isDark,
            }
          )}
        >
          <h3
            className={clsx(
              "text-title font-medium text-primary-text-500 transition",
              {
                "text-primary-text-500": !isDark,
                "text-white": isDark,
              }
            )}
          >
            Clientes potenciales
          </h3>
          <Button
            onClick={() => setShowCreateClient(true)}
            className="w-full lg:w-fit justify-center flex mt-3 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-base  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2"
          >
            +
          </Button>
        </div>
        <div
          className={clsx(
            " p-4 md:p-6 rounded-2xl w-full flex-grow flex flex-col transition",
            {
              "bg-dark-dark-background-panels": isDark,
              "bg-white": !isDark,
            }
          )}
        >
          <div className="flex flex-col gap-4 flex-1">
            {showCreateClient ? <PotentialCustomerCardDefault /> : null}

            {customersData.length > 0 &&
              customersData.map((customer: Customer) => (
                <PotentialCustomerCard key={customer.id} customers={customer} />
              ))}
          </div>
          <div
            className={clsx(
              "relative h-max overflow-auto mt-6 p-2  rounded-2xl w-full",
              {
                "text-dark-dark-text": isDark,
                "text-primary-text-500": !isDark,
              }
            )}
          >
            <div className="flex justify-between">
              <div>
                <div className="font-semibold text-[24px]">Total:</div>
                <div>
                  <div className="font-semibold text-[18px] ">
                    Mensual:{" "}
                    {customersData.length > 0 &&
                      sumSubTotalPotentialCustomer(customersData).monthly}
                    $
                    <br />
                    Puntual:{" "}
                    {customersData.length > 0 &&
                      sumSubTotalPotentialCustomer(customersData).punctual}
                    $
                  </div>
                </div>
              </div>
              <div className="font-semibold text-[24px]">
                {sumTotalPotentialCustomer(customersData)}$
              </div>
            </div>
            <div className="mt-5 flex w-full ">
              {/* <Pagination totalPages={"pages"} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
