import Link from "next/link";
import { GoLogoBlack } from "../ui/lar-logo";
import RecoverForm from "../ui/recoverForm";

export default function RecoverPasswordPage() {
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
        <RecoverForm />
      </div>
    </div>
  );
}
