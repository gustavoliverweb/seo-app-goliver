import { fetchUsersId } from "@/app/lib/data";
import EditUserForm from "@/app/ui/users/editUserForm";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUsersId(params.id);
  console.log(user);
  return (
    <main>
      <div className="items-start justify-between mt-6">
        <div className=" bg-white p-5 md:mr-5 md:ml-5 rounded-2xl lg:flex justify-between items-center">
          <h3 className="text-title text-primary-text-500 font-medium">
            Editar usuario
          </h3>
        </div>
        <div className="relative h-max overflow-auto mt-6 bg-white p-5 md:mr-5 md:ml-5 rounded-2xl">
          <EditUserForm user={user} />
        </div>
      </div>
    </main>
  );
}
