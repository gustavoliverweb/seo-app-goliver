/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import PotentialCustomerWrapper from "@/app/ui/potentialCustomer/potentialCustomerWrapper";
// import Pagination from "@/app/ui/pagination";
import {
  // fetchFilteredPotentialCustomers,
  fetchPotentialCustomers,
  fetchPotentialCustomersPages,
} from "@/app/lib/data";
//server component
export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const customers = await fetchPotentialCustomers();
  const potentialCustomersPages = await fetchPotentialCustomersPages();
  return (
    <PotentialCustomerWrapper
      customers={customers}
      pages={potentialCustomersPages}
      query={query}
      currentPage={currentPage}
    />
  );
}
