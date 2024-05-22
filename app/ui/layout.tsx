import SideNav from "@/app/ui/dashboard/sidenav";
import Search from "@/app/ui/search";
import { LogoutButton } from "@/app/ui/logoutButton";

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-72 pb-6">
        <SideNav>
          <LogoutButton />
        </SideNav>
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
