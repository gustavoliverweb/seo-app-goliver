"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link";

export default function LoginForm() {
  const [code, action] = useFormState(authenticate, undefined);
  return (
    <form
      action={action}
      className="mt-[0px] flex justify-center lg:w-96 justify-self-center"
    >
      <div className="flex-1 rounded-lg  px-6 pb-4 pt-8 text-primary-text-500">
        <div className="flex flex-col items-center">
          <h1 className={`mb-3 text-[35px]`}>Iniciar sesión.</h1>
          <div className="text-[14px]">
            Bienvenido, por favor introduce tus datos.
          </div>
        </div>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="email"
            >
              Correo
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-text-opacity-500"
                id="email"
                type="email"
                name="email"
                placeholder="Introducir el correo"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-text-opacity-500"
                id="password"
                type="password"
                name="password"
                placeholder="Introducir la contraseña"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/recover"
              className="text-[14px] font-medium hover:text-primary-button-500"
            >
              ¿Olvidaste la contraseña?
            </Link>
          </div>
        </div>
        <LoginButton />
        <div className="flex h-8 items-end space-x-1">
          {code === "CredentialSignin" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-4 w-full justify-center bg-primary-button-500 py-6"
      aria-disabled={pending}
    >
      Iniciar sesión
      {/* <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
    </Button>
  );
}
