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
  return (
    <div className="pb-6 flex flex-grow">
      <UsersWrapper users={users} usersPages={usersPages} />
    </div>
  );
}
