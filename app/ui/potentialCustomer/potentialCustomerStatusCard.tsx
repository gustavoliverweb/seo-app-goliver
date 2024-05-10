export default function PotentialCustomerStatusCard({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div
      style={{
        background: className,
        color: className ? "white" : "black",
        border: className ? "1px solid transparent" : "1px solid #D0D5DD",
      }}
      className="w-fit rounded-full border border-gray-200 px-4 py-2"
    >
      <div className="text-[12px]">{label}</div>
    </div>
  );
}
