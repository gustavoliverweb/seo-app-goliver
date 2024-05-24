/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fetchAgencyTemplate, fetchUsers } from "@/app/lib/data";
import ReportCreateWrapper from "@/app/ui/reports/reportCreateWrapper";

export default async function Page() {
  const data = await fetchAgencyTemplate();
  const users = await fetchUsers();
  return (
    <div className="pb-6 flex flex-grow">
      <ReportCreateWrapper templateData={data} users={users} />
    </div>
  );
}
