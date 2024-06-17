/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useFormState } from "react-dom";
import { createAgencyClients } from "@/app/lib/actions";
import { Button } from "../button";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ColorPicker } from "../colorPicker";
import { useStore } from "@/app/lib/store";
import clsx from "clsx";

type Agency = {
  agency_name: string;
};

export default function CreateClientForm({ agencys }: { agencys: Agency[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createAgencyClients, initialState);
  const [colorCard, setColorCard] = useState("#ffffff");
  const [agencyName, setAgencyName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [logoImage, setLogoImage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [showBackgroundCard, setShowBackgroundCard] = useState<boolean>(false);
  const [selectAgency, setSelectAgency] = useState<string[]>([]);
  const backGroudCardRef = useRef<HTMLInputElement>(null);
  const { isDark } = useStore();

  useEffect(() => {
    const uniqueAgency = new Set(agencys);
    setSelectAgency(Array.from(uniqueAgency) as []);
  }, [agencys]);

  const handleParentClick = (e: React.MouseEvent) => {
    const targetBackgroundCard = (e.target as HTMLElement).closest(
      "[name=color_card]"
    );
    const targetColorPicker = (e.target as HTMLElement).closest(
      ".color-picker-hex"
    );
    const dataOpenBackgroundCard =
      backGroudCardRef?.current?.getAttribute("data-open");
    if (
      dataOpenBackgroundCard === "true" &&
      !targetBackgroundCard &&
      !targetColorPicker
    ) {
      if (backGroudCardRef.current) {
        backGroudCardRef.current.style.display = "none";
      }
      setShowBackgroundCard(false);
    }
  };
  const handleChangeInputLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true);
    const file = e.target.files?.[0];
    console.log(e.target.files);
    if (!file) return;
    const reader = new FileReader();
    const name = agencyName.trim().replace(" ", "");
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const base64String = e.target?.result as string;
      const upLoadImage = await fetch(
        `/api/uploadClientLogo?agency=${name}&client=${clientName}`,
        {
          method: "POST",
          body: JSON.stringify({ files: base64String }),
        }
      );
      const uploadResult = await upLoadImage.json();
      setImageUrl(uploadResult.uploadedImages.secure_url);
      setLoadingImage(false);
      setLogoImage(base64String);
    };

    reader.readAsDataURL(file);
  };
  return (
    <form action={dispatch}>
      <input type="text" name="logo_url" value={imageUrl} readOnly hidden />
      <div className="rounded-md p-4 md:p-6">
        <div className="text-[1.3rem]">Información de la agencia</div>
        <div className="mt-6 mb-4">
          <label
            htmlFor="agency_name"
            className="mb-2 block text-sm font-medium"
          >
            Nombre de agencia
          </label>
          <div className="w-fit relative mt-2 rounded-md">
            <div className="relative flex items-center">
              <select
                className={clsx(
                  "w-[360px] rounded-md border border-gray-200 transition focus:ring-[#794BD8] focus:border-[#794BD8] ",
                  {
                    "bg-dark-dark-background-panels": isDark,
                  }
                )}
                onChange={(e) => setAgencyName(e.target.value)}
              >
                {selectAgency.map((agency) => (
                  <option key={agency} value={agency}>
                    {agency}
                  </option>
                ))}
                <option value=""></option>
              </select>
              <input
                id="agency_name"
                onChange={(e) => setAgencyName(e.target.value)}
                name="agency_name"
                type="text"
                placeholder="Introduce el nombre de la agencia"
                className={clsx(
                  "form-input w-[320px] h-8 absolute left-1 block md:w-80 border-0 py-2 text-sm focus:outline-none placeholder:text-gray-500 transition ",
                  {
                    "bg-dark-dark-background-panels": isDark,
                  }
                )}
                aria-describedby="agency_name-error"
                value={agencyName}
              />
            </div>
            {state.errors?.agency_name ? (
              <div
                id="agency_name-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.agency_name.map((error: string) => (
                  <p className="text-[14px]" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-6 mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre del cliente
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="client_name"
                onChange={(e) => setClientName(e.target.value)}
                name="client_name"
                type="text"
                placeholder="Introduce el nombre del cliente"
                className={clsx(
                  "block w-full md:w-80 rounded-md border border-gray-200 py-2 text-sm outline-1 placeholder:text-gray-500 transition focus:ring-[#794BD8] focus:border-[#794BD8]",
                  {
                    "bg-dark-dark-background-panels": isDark,
                  }
                )}
                aria-describedby="client_name-error"
              />
            </div>
            {state.errors?.client_name ? (
              <div
                id="client_name-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.client_name.map((error: string) => (
                  <p className="text-[14px]" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-6 mb-4">
          <label
            htmlFor="monthly_payment"
            className="mb-2 block text-sm font-medium"
          >
            Mensualidad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="monthly_payment"
                name="monthly_payment"
                type="number"
                placeholder="Introduce un monto"
                className={clsx(
                  "block w-full md:w-80 rounded-md border border-gray-200 py-2 text-sm outline-1 placeholder:text-gray-500 transition focus:ring-[#794BD8] focus:border-[#794BD8]",
                  {
                    "bg-dark-dark-background-panels": isDark,
                  }
                )}
                aria-describedby="monthly_payment-error"
              />
            </div>
            {state.errors?.monthly_payment ? (
              <div
                id="monthly_payment-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.monthly_payment.map((error: string) => (
                  <p className="text-[14px]" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-fit mb-4 mt-10">
          <div className="mb-2 block text-sm font-medium">Logo</div>
          <div className="relative mt-2 rounded-md">
            <div className="relative w-fit">
              <label
                htmlFor="logo_url_valid"
                className={clsx(
                  "w-full md:w-80 rounded-md border border-gray-200 cursor-pointer py-10 flex justify-center items-center",
                  {
                    "text-dark-dark-border": isDark,
                  }
                )}
              >
                {loadingImage ? (
                  <span className="loader"></span>
                ) : logoImage ? (
                  <Image src={logoImage} width={320} height={106} alt="logo" />
                ) : (
                  "Subir imagen"
                )}
              </label>

              <input
                id="logo_url_valid"
                onChange={handleChangeInputLogo}
                name="logo_url_valid"
                type="file"
                className="border-none outline-0 opacity-0 absolute top-0 w-full h-full"
                aria-describedby="logo_url_valid-error"
              />
            </div>
            {state.errors?.logo_url_valid ? (
              <div
                id="logo_url_valid-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.logo_url_valid.map((error: string) => (
                  <p className="text-[14px]" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* colors */}
        <div
          className="md:flex justify-between"
          // style={{ border: "2px solid blue" }}
          onClick={handleParentClick}
        >
          <div className="mb-4 mt-10 md:mt-0">
            <label
              htmlFor="color_card"
              className="mb-2 block text-sm font-medium"
            >
              Color de fondo de la tarjeta
            </label>
            <input name="color_card" value={colorCard} hidden readOnly />

            <ColorPicker
              setColor={setColorCard}
              color={colorCard}
              showPicker={showBackgroundCard}
              setShowPicker={setShowBackgroundCard}
              ref={backGroudCardRef}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        {/* <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link> */}
        <Button className="rounded-lg bg-primary-button-500 p-6" type="submit">
          Guardar cliente
        </Button>
      </div>
    </form>
  );
}
