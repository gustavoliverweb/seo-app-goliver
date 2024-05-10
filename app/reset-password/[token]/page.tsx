import { GoLogoBlack } from "@/app/ui/lar-logo";
import ResetPasswordForm from "@/app/ui/reset-password-form";
import Link from "next/link";

export default function ResetPassword() {
  return (
    <div>
      <Link
        className="flex justify-start rounded-md px-4 py-2 md:h-40"
        href="/"
      >
        <div className="w-40 text-text-opacity-500  md:w-40">
          <GoLogoBlack />
          <div className="text-[0.875rem] text-center">Herramienta de SEO</div>
        </div>
      </Link>
      <div className="mt-36">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
