import CreateUserForm from "@/app/ui/users/createUserForm";

export default async function Page() {
  return (
    <main>
      <div className="items-start justify-between mt-6">
        <div className=" bg-white p-5 md:mr-5 md:ml-5 rounded-2xl lg:flex justify-between items-center">
          <h3 className="text-title text-primary-text-500 font-medium">
            Nuevo usuario
          </h3>
        </div>
        <div className="relative h-max overflow-auto mt-6 bg-white p-5 md:mr-5 md:ml-5 rounded-2xl">
          <CreateUserForm />
        </div>
      </div>
    </main>
  );
}
