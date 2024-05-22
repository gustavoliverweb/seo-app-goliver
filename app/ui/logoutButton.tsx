import { signOut } from "@/auth";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export async function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100  md:flex-none md:justify-start md:p-2 md:px-3">
        <ArrowLeftIcon className="w-6" />
        <div className="hidden md:block">Cerrar sesión</div>
      </button>
    </form>
  );
}
