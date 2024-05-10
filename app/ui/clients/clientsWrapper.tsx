/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { ClientsCard } from "./clientsCard";
import { Clients } from "@/app/lib/definitions";
// import { useFormState } from "react-dom";
import { deleteClient } from "@/app/lib/actions";
import { useSearchParams, useRouter } from "next/navigation";
import ConfirmModal from "../confirmModal";

export default function ClientsWrapper({
  clients = [],
  currentPage,
  query,
}: {
  clients: Clients[];
  currentPage: number;
  query: string;
}) {
  const [clientsData, setClientsData] = useState([]);
  const [totalClients, setTotalClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clientData, setClientData] = useState({
    id: "",
    name: "",
    agencyId: "",
  });
  const params = useSearchParams();
  const page = params.get("page");
  const deleteClientWithId = deleteClient.bind(
    null,
    clientData?.id,
    page,
    clientData.agencyId
  );
  // const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(deleteClientWithId, initialState);
  const router = useRouter();

  useEffect(() => {
    const transformData = () => {
      const newData = clients.reduce((acc, curr) => {
        const { agency_name } = curr;
        if (!acc[agency_name]) {
          acc[agency_name] = [];
        }
        acc[agency_name].push(curr);
        return acc;
      }, {});
      const arrayOfObjects = Object.entries(newData).map(([key, value]) => {
        return {
          [key]: value,
        };
      });
      const totalClientPerPage = clientsPerPage(currentPage, arrayOfObjects);
      console.log(totalClientPerPage);
      setTotalClients(arrayOfObjects);
      setClientsData(totalClientPerPage);
    };
    transformData();
  }, [currentPage, query]);

  const clientsPerPage = (page, array) => {
    const starIndex = (page - 1) * 3;
    const endIndex = page * 3;
    return array.slice(starIndex, endIndex);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(clientData);
    const result = await deleteClientWithId();
    if (result.success) {
      console.log(result);
      setShowModal(false);
      router.push(`/dashboard/clients`);
      router.refresh();
    }
  };

  if (query && clients.length === 0) {
    return (
      <div className="flex flex-grow justify-center items-center text-[24px]">
        No hay coincidencias con la búsqueda: {query}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        {clientsData.length > 0 &&
          clientsData.map((client) =>
            Object.keys(client).map((agencyName) => (
              <div key={agencyName}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-[20px]">{agencyName}</h3>
                  <div className="font-semibold">
                    {sumSubTotal(client, agencyName)} $
                  </div>
                </div>
                <div className="bg-white grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] grid-rows-[auto,_auto] gap-4  mt-6">
                  {client[agencyName].map((client) => (
                    <ClientsCard
                      client={client}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      setClientData={setClientData}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
      </div>
      <div className="flex justify-between font-semibold text-[24px] my-6">
        <div>Total:</div>
        <div>
          {totalClients.length > 0 &&
            totalClients.reduce((acc, curr) => {
              return acc + sumSubTotal(curr, Object.keys(curr)[0]);
            }, 0)}
          $
        </div>
      </div>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
      >
        ¿Estas seguro de eliminar el cliente{" "}
        <span className="font-medium">{clientData.name}</span> ?
      </ConfirmModal>
    </>
  );
}

function sumSubTotal(client, agencyName) {
  const amount = client[agencyName].reduce((acc, curr) => {
    return acc + Number(curr.monthly_payment);
  }, 0);
  return amount;
}
