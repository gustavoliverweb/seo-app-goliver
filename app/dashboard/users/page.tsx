import UsersWrapper from "@/app/ui/users/usersWrapper";
import { fetchFilteredUsers } from "@/app/lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams?.query || "";
  const users = await fetchFilteredUsers(query);
  return (
    <div className="pb-6 flex flex-grow">
      <UsersWrapper users={users} query={query} />
    </div>
  );
}
