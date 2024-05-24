import { useStore } from "@/app/lib/store";
import { AttachReports } from "../buttons";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

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
  const { isDark } = useStore();
  const handleDeleteReport = () => {
    setReportId(id);
    setShowModal(true);
  };
  return (
    <>
      <div
        className={clsx(
          "relative rounded-md border border-gray-200 p-6 transition",
          {
            "bg-dark-dark-background-card": isDark,
            "border-dark-dark-border": isDark,
          }
        )}
      >
        <div className="flex justify-between items-center">
          <div>
            <div
              className={clsx("font-medium", {
                "text-dark-dark-text": isDark,
              })}
            >
              {name} - {templateName}
            </div>
          </div>
          <div className="flex gap-2 pr-2">
            <AttachReports id={id} name={name} />
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
