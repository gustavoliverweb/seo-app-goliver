/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { fetchAgencyTemplate, fetchUsers } from "@/app/lib/data";
import SendReportForm from "@/app/ui/reports/sendReportForm";

export default async function Page() {
  const data = await fetchAgencyTemplate();
  const users = await fetchUsers();
  console.log(users);
  return (
    <main>
      <div className="items-start justify-between mt-6 mb-6">
        <div className=" bg-white p-5 md:mr-5 md:ml-5 rounded-2xl lg:flex justify-between items-center">
          <h3 className="text-title font-medium text-primary-text-500">
            Nuevo informe
          </h3>
        </div>
        {/* <div className="relative h-max overflow-auto mt-6 bg-white p-5 md:mr-5 md:ml-5 rounded-2xl">
          <CreateReportForm />
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-y-6 grid-rows-2 relative h-max overflow-auto mt-6 bg-[#f0f1f3] md:mr-5 md:ml-5 rounded-2xl">
          <SendReportForm templateData={data} users={users} />
        </div>
      </div>
    </main>
  );
}
