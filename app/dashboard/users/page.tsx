import UsersWrapper from "@/app/ui/users/usersWrapper";
import { fetchUsers } from "@/app/lib/data";

export default async function Page() {
  const users = await fetchUsers();
  return (
    <div className="pb-6 flex flex-grow">
      <UsersWrapper users={users} />
    </div>
  );
}
