import SideNav from "@/app/ui/dashboard/sidenav";
import { LogoutButton } from "@/app/ui/logoutButton";
import TopNav from "./topNav";

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
        <TopNav />
        {children}
      </div>
    </div>
  );
}
