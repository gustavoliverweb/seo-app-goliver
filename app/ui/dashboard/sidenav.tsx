import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { GoLogoBlack } from "@/app/ui/lar-logo";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import { Avatar } from "../avatar";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-white rounded-br-2xl">
      <div className="flex justify-between items-center">
        <Link
          className="flex justify-start rounded-md px-4 py-2 md:h-40"
          href="/"
        >
          <div className="w-40 text-text-opacity-500  md:w-40">
            <GoLogoBlack />
            <div className="text-[0.875rem] text-center">
              Herramienta de SEO
            </div>
          </div>
        </Link>
        <Avatar />
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden  w-full grow rounded-md  md:block"></div>
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
      </div>
    </div>
  );
}
