import { GoLogoWhite } from "@/app/ui/lar-logo";
import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
  return (
    <main className="items-center justify-center h-screen">
      <div className="relative mx-auto grid grid-cols-1 lg:grid-cols-2 h-full w-full  items-center ">
        <div className="flex h-full w-fullrounded-lg bg-primary-button-500 p-3 items-center justify-center">
          <div className="text-white w-56 md:w-2/4">
            <GoLogoWhite />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
