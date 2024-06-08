import { useStore } from "@/app/lib/store";
import clsx from "clsx";

export default function PotentialCustomerStatusCard({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  const { isDark } = useStore();
  return (
    <div
      style={{
        background: className,
        border: className ? "1px solid transparent" : "1px solid #D0D5DD",
      }}
      className={clsx(
        "w-full lg:w-[100px] rounded-full border border-gray-200 px-4 py-2 transition text-center",
        {
          "text-dark-dark-text": isDark && className,
          "text-white": isDark && !className,
          "text-dark-text-potential-customer": !isDark && className,
        }
      )}
    >
      <div className="text-[12px]">{label}</div>
    </div>
  );
}
