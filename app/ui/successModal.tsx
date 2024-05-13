import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function SuccessModal({
  showModal,
  children,
  top,
}: {
  showModal: boolean;
  children: React.ReactNode;
  top?: string;
}) {
  return (
    <div>
      {showModal && (
        <div
          className={`bg-errors-success-light border-b-[6px] border-errors-success-dark flex flex-col items-end absolute rounded-2xl ${top} left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-8  z-10`}
        >
          {/* <div
            onClick={() => setShowModal(false)}
            className="w-8 h-8 mb-6 bg-transparent rounded-full flex items-center justify-center  text-errors-warning-dark border border-errors-warning-dark cursor-pointer hover:bg-secondary-green-500 hover:text-black hover:border-transparent transition-colors"
          >
            X
          </div> */}
          <div className="flex gap-4">
            <ExclamationCircleIcon className="w-8 text-errors-success-dark" />
            <div>{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
