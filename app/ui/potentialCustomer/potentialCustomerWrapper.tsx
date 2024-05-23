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

export default function PotentialCustomerWrapper({
  customers = [],
  // pages,
  query,
  currentPage,
}: {
  customers: Customer[];
  pages: number;
  query: string;
  currentPage: number;
}) {
  const { showCreateClient, setShowCreateClient, customersData, setCustomers } =
    useStore();
  const uiArray = Object.assign([], customersData);
  const reverseArray = uiArray.reverse();
  console.log(customersData);
  useEffect(() => {
    console.log(customers);
    setCustomers(customers);
  }, [currentPage]);

  if (query && customers.length === 0) {
    return (
      <div className="pb-6 flex flex-grow">
        <div className="items-start justify-between mt-6 w-full flex flex-col px-5 gap-6">
          <div className="bg-white p-5  rounded-2xl lg:flex justify-between items-center w-full">
            <h3 className="text-title text-primary-text-500 font-medium">
              Clientes potenciales
            </h3>
            <Button
              onClick={() => setShowCreateClient(true)}
              className="w-full lg:min-w-fit justify-center flex mt-3 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-base  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2"
            >
              +
            </Button>
          </div>
          <div className="bg-white  p-4 md:p-6 rounded-2xl w-full flex-grow flex flex-col justify-center">
            <div className="flex flex-col gap-4">
              <div className="flex flex-grow justify-center items-center text-[24px]">
                No hay coincidencias con la búsqueda: {query}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start justify-between mt-6 w-full flex flex-col px-5 gap-6">
        <div className="bg-white p-5  rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title text-primary-text-500 font-medium">
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
          style={{
            justifyContent:
              showCreateClient ||
              reverseArray.length > 0 ||
              customers.length > 0
                ? "space-between"
                : "flex-end",
          }}
          className="bg-white  p-4 md:p-6 rounded-2xl w-full flex-grow flex flex-col"
        >
          <div className="flex flex-col gap-4">
            {showCreateClient ? <PotentialCustomerCardDefault /> : null}

            {customersData.length > 0 &&
              customersData.map((customer: Customer) => (
                <PotentialCustomerCard key={customer.id} customers={customer} />
              ))}
          </div>
          <div className="relative h-max overflow-auto mt-6 bg-white p-2  rounded-2xl w-full">
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
