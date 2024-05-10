/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CreatePotentialCustomerForm from "./createPotentialCustomerForm";

export function PotentialCustomerCardDefault() {
  return (
    <>
      <div className="relative rounded-md border border-gray-200  justify-between p-2 md:p-6">
        <CreatePotentialCustomerForm />
      </div>
    </>
  );
}
