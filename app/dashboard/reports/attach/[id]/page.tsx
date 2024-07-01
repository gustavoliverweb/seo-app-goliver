/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CoverCard } from "@/app/ui/audit/ coverCard";
import { fetchReportId } from "@/app/lib/data";
import { AuditCard } from "@/app/ui/audit/auditCard";
import { KeywordsCard } from "@/app/ui/audit/keywordsCard";
import { SemrushCard } from "@/app/ui/audit/semrushCard";
import { CreatePdf } from "@/app/ui/buttons";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const report = await fetchReportId(id);

  return (
    <div className="pb-6 ">
      <div className="items-start justify-between  mt-6">
        <div className="bg-white p-5 md:mr-5 md:ml-5 rounded-2xl lg:flex justify-between items-center">
          <h3 className="text-title font-medium">Adjuntar reportes</h3>
        </div>
        <div className="flex flex-col gap-12 h-max  mt-6 bg-white p-5 md:mr-5 md:ml-5 rounded-2xl">
          <div>
            <h3 className="mb-4 text-[1.438rem]">Imagen de portada</h3>
            <div className="">
              <CoverCard folderPath={report?.name} />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-[1.438rem]">Informe Técnico (PDF)</h3>
            <AuditCard folderPath={report?.name} />
          </div>
          <div>
            <h3 className="mb-4 text-[1.438rem]">Estudio de keywords (PDF)</h3>
            <KeywordsCard folderPath={report?.name} />
          </div>
          <div>
            <h3 className="mb-4 text-[1.438rem]">Semrush</h3>
            <SemrushCard folderPath={report?.name} reportId={report?.id} />
          </div>
        </div>
        <div className="relative h-max overflow-auto mt-6 bg-white p-12 md:mr-5 md:ml-5 rounded-2xl">
          <div className="flex justify-center items-center">
            <div className="">
              <CreatePdf id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
