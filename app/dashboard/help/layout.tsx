import { LogoutButton } from "@/app/ui/logoutButton";
import Search from "../../ui/search";
import DocsSideNav from "@/app/ui/dashboard/docsSideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-72 pb-6">
        <DocsSideNav>
          <LogoutButton />
        </DocsSideNav>
      </div>
      <div className="flex-grow  md:overflow-y-auto flex flex-col">
        <div className=" flex flex-col items-center justify-between gap-2  md:flex-row bg-white p-5">
          <Search />
        </div>
        {children}
      </div>
    </div>
  );
}
