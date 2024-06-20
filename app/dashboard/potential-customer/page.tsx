/* eslint-disable @typescript-eslint/ban-ts-comment */
import PotentialCustomerWrapper from "@/app/ui/potentialCustomer/potentialCustomerWrapper";
import {
  fetchFilteredPotentialCustomers,
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
  const customers = await fetchFilteredPotentialCustomers(query, currentPage);
  console.log("customers", customers);
  const potentialCustomersPages = await fetchPotentialCustomersPages();
  return <PotentialCustomerWrapper customers={customers} query={query} />;
}
