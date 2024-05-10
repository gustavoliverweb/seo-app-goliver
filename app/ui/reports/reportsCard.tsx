import { AttachReports } from "../buttons";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ReportsProps = {
  id: string;
  name: string;
  templateName: string;
  setReportId: (id: string) => void;
  setShowModal: (show: boolean) => void;
};

export function ReportsCard({
  id,
  name,
  templateName,
  setReportId,
  setShowModal,
}: ReportsProps) {
  // console.log("id-attach", id);
  const handleDeleteReport = () => {
    // console.log("Delete report", name);
    setReportId(id);
    setShowModal(true);
  };
  return (
    <>
      <div className="relative">
        <div className="rounded-md border border-gray-200 flex justify-between items-center p-6">
          <div>
            <div>
              {name} - {templateName}
            </div>
          </div>
          <div className="flex gap-2 pr-2">
            <AttachReports id={id} name={name} />
            {/* <div className="rounded-md border border-gray-200 p-2">Editar</div>
            <div className="rounded-md border border-gray-200 p-2">
              Descargar
            </div> */}
            {/* <DeleteReport id={name} /> */}
          </div>
        </div>
        <div className="absolute top-[4px] right-[4px]">
          <div
            className="flex text-white items-center rounded-full p-1  bg-secondary-green-500 cursor-pointer hover:bg-green-600 transition-colors"
            onClick={handleDeleteReport}
          >
            {<XMarkIcon className="h-4 w-4 " />}
          </div>
        </div>
      </div>
    </>
  );
}
