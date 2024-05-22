import { AgencyTemplate } from "@/app/lib/definitions";
import SvgCoverAgency from "../svgCoverAgency";

export function AgencyCard({ agency }: { agency: AgencyTemplate }) {
  return (
    <>
      <div className="w-full  h-80 rounded-lg border-2 border-gray-200 ">
        <SvgCoverAgency agency={agency} />
      </div>
      <div className="mt-2">{agency?.name}</div>
    </>
  );
}
