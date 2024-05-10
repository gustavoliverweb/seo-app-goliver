"use client";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { useState } from "react";
import SuccessModal from "./successModal";
import ErrorModal from "./errorModal";

export default function ResetPasswordForm() {
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const token = pathname?.split("/")[2];
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log(token);
    const data = new FormData(event.currentTarget);
    data.append("token", token);
    const resetPasswordData = await fetch("/api/auth/set-new-password", {
      method: "POST",
      body: data,
    });
    setLoading(false);
    const result = await resetPasswordData.json();
    console.log(result);
    if (resetPasswordData.ok) {
      setMessage(result.message);
      setShowModalSuccess(true);
      setTimeout(() => {
        setShowModalSuccess(false);
      }, 3500);
    } else {
      setMessage(result.message);
      setShowModalError(true);
      setTimeout(() => {
        setShowModalError(false);
      }, 3500);
    }
  };
  return (
    <div>
      <SuccessModal showModal={showModalSuccess} top="top-[150px]">
        <div>
          <div className="text-[24px] text-errors-success-dark font-medium">
            Éxito
          </div>
          <div className="text-errors-success-dark text-[18px]">{message}</div>
        </div>
      </SuccessModal>
      <ErrorModal showModal={showModalError} top="top-[150px]">
        <div>
          <div className="text-[24px] text-errors-error-dark font-medium">
            Error
          </div>
          <div className="text-errors-error-dark text-[18px]">{message}</div>
        </div>
      </ErrorModal>

      <div className="h-full flex justify-center items-center">
        <div className="bg-white rounded-2xl p-6">
          <h1 className="text-[32px]">Introduce una nueva contraseña</h1>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col">
            <div className="text-[20px] mb-6">
              {/* Por favor introduce tu correo electrónico. */}
            </div>
            <input
              type="password"
              name="password-reset"
              // placeholder="Correo electrónico"
              className="rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-text-opacity-500"
            />
            {/* <div>
            <p className="max-w-[350px]">
              Enviaremos los datos a este correo electrónico si coincide con
              una cuenta de existente.
            </p>
          </div> */}
            <div className="flex items-center justify-end gap-4 mt-12">
              <Button
                type="submit"
                className=" justify-center bg-primary-button-500 py-6 min-w-[80px]"
              >
                {loading ? <div className="loader-send-mail"></div> : "Enviar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
