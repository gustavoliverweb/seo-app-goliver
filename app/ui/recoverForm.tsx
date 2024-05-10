"use client";
import Link from "next/link";
import { Button } from "./button";
import { useState } from "react";
import SuccessModal from "./successModal";
import ErrorModal from "./errorModal";

export default function RecoverForm() {
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // console.log("Form submitted");
    const data = new FormData(e.currentTarget);
    const resetPasswordData = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: data,
    });
    setLoading(false);
    const result = await resetPasswordData.json();
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
    console.log(result);
  };

  return (
    <div className="">
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
          <h1 className="text-[32px]">Contraseña olvidada</h1>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col">
            <div className="text-[20px] mb-6">
              Por favor introduce tu correo electrónico.
            </div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-text-opacity-500"
            />
            {/* <div>
              <p className="max-w-[350px]">
                Enviaremos los datos a este correo electrónico si coincide con
                una cuenta de existente.
              </p>
            </div> */}
            <div className="flex items-center justify-end gap-4 mt-12">
              <Link
                className="flex h-10 items-center rounded-lg bg-gray-200 px-4 py-6 text-sm font-medium text-black transition-colors  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                href="/"
              >
                Cancelar
              </Link>
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
