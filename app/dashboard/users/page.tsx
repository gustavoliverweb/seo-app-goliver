import UsersWrapper from "@/app/ui/users/usersWrapper";
import {
  fetchFilteredUsers,
  fetchUsers,
  fetchUsersPages,
} from "@/app/lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const users = await fetchUsers();
  return (
    <div className="pb-6 flex flex-grow">
      <UsersWrapper users={users} />
    </div>
  );
}
