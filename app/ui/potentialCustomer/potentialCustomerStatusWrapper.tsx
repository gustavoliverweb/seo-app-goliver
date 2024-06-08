import { Customer } from "@/app/lib/definitions";
import PotentialCustomerStatusCard from "./potentialCustomerStatusCard";

const statusArray = [
  { status: "proposal", label: "Propuesta" },
  { status: "lost", label: "Perdido" },
  { status: "won", label: "Ganado" },
  { status: "open", label: "Abierto" },
];

export default function PotentialCustomerStatusWrapper({
  customer,
}: {
  customer: Customer;
}) {
  const className = () => {
    switch (customer?.status) {
      case "proposal":
        return "#7c7cd3";
      case "lost":
        return "#6F1313";
      case "won":
        return "#4CD88A";
      case "open":
        return "#e667dc";
      default:
        return "";
    }
  };
  return (
    // <div className="w-full flex justify-between mt-6 lg:mt-0 lg:gap-2">
    <div className="w-full lg:w-fit grid grid-cols-2 md:grid-cols-4 mt-6 lg:mt-0 gap-2">
      {statusArray.map((data) => (
        <div key={data.status}>
          <PotentialCustomerStatusCard
            label={data.label}
            className={data.status === customer?.status ? className() : ""}
          />
        </div>
      ))}
    </div>
  );
}
