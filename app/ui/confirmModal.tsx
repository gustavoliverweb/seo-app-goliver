import { useStore } from "../lib/store";
import { Button } from "./button";

export default function ConfirmModal({
  showModal,
  setShowModal,
  handleSubmit,
  children,
}: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}) {
  const { setIsModalDeleteShow } = useStore();
  const handleClick = () => {
    setIsModalDeleteShow(false);
    setShowModal(false);
  };
  return (
    <div>
      {showModal && (
        <div className="absolute rounded-2xl shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white z-50">
          <div className="text-[20px]">{children}</div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-end mt-12 gap-4"
          >
            <div
              onClick={handleClick}
              className="bg-transparent rounded-lg flex items-center px-4 text-errors-warning-dark  cursor-pointer hover:bg-gray-200 hover:text-black hover:border-transparent transition-colors"
            >
              Cancelar
            </div>
            <Button
              type="submit"
              className="bg-red-700 hover:bg-red-900 min-w-fit"
            >
              Eliminar
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
