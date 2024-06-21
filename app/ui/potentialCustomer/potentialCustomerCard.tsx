/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Customer } from "@/app/lib/definitions";
import EditPotentialCustomerForm from "./editPotentialCustomerForm";
import { useState } from "react";
import { deletePotentialCustomer } from "@/app/lib/actions";
import ConfirmModal from "../confirmModal";
import { useStore } from "@/app/lib/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function PotentialCustomerCard({
  customers,
  id,
}: {
  customers: Customer;
  id: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [customerId, setPotentialCustomerId] = useState("");
  const deletePotentialCustomerWithId = deletePotentialCustomer.bind(
    null,
    customerId
  );
  const { setCustomers, customersData, setIsModalDeleteShow } = useStore();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deleteCustomer = customersData.filter(
      (customer) => customer.id !== customerId
    );
    console.log(deleteCustomer);
    // console.log(customerId);
    await deletePotentialCustomerWithId();
    setCustomers(deleteCustomer);

    setShowModal(false);
    setIsModalDeleteShow(false);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="relative rounded-md border border-gray-200  justify-between p-6">
        <EditPotentialCustomerForm
          customers={customers}
          setShowModal={setShowModal}
          setPotentialCustomerId={setPotentialCustomerId}
        />
      </div>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
      >
        ¿Estás seguro de eliminar el cliente potencial {customers?.name}?
      </ConfirmModal>
    </div>
  );
}
