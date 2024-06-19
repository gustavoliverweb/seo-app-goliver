import { fetchUsersId } from "@/app/lib/data";
import WrapperEditUsers from "@/app/ui/users/wrapperEditUsers";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUsersId(params.id);
  return <WrapperEditUsers user={user} />;
}
