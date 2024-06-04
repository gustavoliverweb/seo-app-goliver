import { LogoutButton } from "@/app/ui/logoutButton";
import DocsSideNav from "@/app/ui/dashboard/docsSideNav";
import TopNav from "@/app/ui/topNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-72 pb-6">
        <DocsSideNav>
          <LogoutButton />
        </DocsSideNav>
      </div>
      <div className="flex-grow  md:overflow-y-auto flex flex-col">
        <TopNav />
        {children}
      </div>
    </div>
  );
}
