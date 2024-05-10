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
  return (
    <div>
      {showModal && (
        <div className="absolute rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-12 bg-white border-2 border-errors-warning-dark z-10">
          <div className="text-[20px]">{children}</div>
          <form onSubmit={handleSubmit} className="flex justify-between mt-12">
            <div
              onClick={() => setShowModal(false)}
              className="bg-transparent rounded-lg flex items-center px-4 text-errors-warning-dark border border-errors-warning-dark cursor-pointer hover:bg-secondary-green-500 hover:text-black hover:border-transparent transition-colors"
            >
              Cancelar
            </div>
            <Button
              type="submit"
              className="bg-red-700 hover:bg-errors-warning-dark"
            >
              Eliminar
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
