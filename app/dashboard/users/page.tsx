import Pagination from "@/app/ui/pagination";
import { CreateUser } from "@/app/ui/buttons";

import UsersWrapper from "@/app/ui/users/usersWrapper";
import { fetchFilteredUsers, fetchUsersPages } from "@/app/lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const usersPages = await fetchUsersPages();
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const users = await fetchFilteredUsers(query, currentPage);
  // console.log(users);
  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div className="bg-white p-5 rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title text-primary-text-500 font-medium">
            Usuarios
          </h3>
          <CreateUser />
        </div>
        <div className="relative h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col justify-between">
          <UsersWrapper users={users} />
          <div className="mt-5 flex w-full ">
            <Pagination totalPages={usersPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
