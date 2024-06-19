"use client";

import { useFormState } from "react-dom";
import { createAgencyTemplate } from "@/app/lib/actions";
import { Button } from "../button";
import { useRef, useState } from "react";
import Image from "next/image";
import { WrapperColorPicker } from "../wrapperColorPicker";
import { useStore } from "@/app/lib/store";
import clsx from "clsx";

export default function CreateAgencyForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createAgencyTemplate, initialState);
  const [agencyName, setAgencyName] = useState<string>("");
  const agencyRef = useRef(null);
  const [logoImage, setLogoImage] = useState<string>("");
  const [logoOpacityImage, setLogoOpacityImage] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [logoOpacityUrl, setLogoOpacityUrl] = useState<string>("");
  const [loadingLogoImage, setLoadingLogoImage] = useState<boolean>(false);
  const [loadingOpacityLogoImage, setLoadingOpacityLogoImage] =
    useState<boolean>(false);
  const { isDark } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setAgencyName(e.target.value);
  };

  const handleChangeInputLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingLogoImage(true);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    const name = agencyName.trim().replace(" ", "");
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const base64String = e.target?.result as string;
      const upLoadImage = await fetch(
        `/api/uploads?agency=${name}&logo-type=logo`,
        {
          method: "POST",
          body: JSON.stringify({ files: base64String }),
        }
      );
      const uploadResult = await upLoadImage.json();
      setLogoUrl(uploadResult.uploadedImages.secure_url);
      setLoadingLogoImage(false);
      setLogoImage(base64String);
    };

    reader.readAsDataURL(file);
  };

  const handleChangeInputLogoOpacity = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoadingOpacityLogoImage(true);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    const name = agencyName.trim().replace(" ", "");
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const base64String = e.target?.result as string;
      const upLoadImage = await fetch(
        `/api/uploads?agency=${name}&logo-type=logo-opacity`,
        {
          method: "POST",
          body: JSON.stringify({ files: base64String }),
        }
      );
      const uploadResult = await upLoadImage.json();
      setLogoOpacityUrl(uploadResult.uploadedImages.secure_url);
      setLoadingOpacityLogoImage(false);
      setLogoOpacityImage(base64String);
    };

    reader.readAsDataURL(file);
  };

  return (
    <form action={dispatch}>
      <input type="text" name="logo_url" value={logoUrl} readOnly hidden />
      <input
        type="text"
        name="opacity_logo_url"
        value={logoOpacityUrl}
        readOnly
        hidden
      />
      <div
        className={clsx("rounded-md  transition", {
          "text-dark-dark-text": isDark,
        })}
      >
        <div className="text-[1.3rem]">Información de la agencia</div>
        <div className="mt-6 mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre de la agencia
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                ref={agencyRef}
                id="name"
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Introduce el nombre de la agencia"
                className={clsx(
                  "block w-full md:w-80 rounded-md border py-2 text-sm outline-2 placeholder:text-gray-500 transition focus:ring-[#794BD8] focus:border-[#794BD8]",
                  {
                    "bg-dark-dark-background-panels": isDark,
                    "border-gray-200": !isDark,
                    "border-dark-dark-border": isDark,
                  }
                )}
                aria-describedby="name-error"
              />
            </div>
            {state?.errors?.name ? (
              <div
                id="name-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.name.map((error: string) => (
                  <p className="text-[14px]" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mb-4 mt-10 md:w-fit">
          <div className="mb-2 block text-sm font-medium">Logo color</div>

          {/* ////////////////// */}
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <label
                htmlFor="logo_url_valid"
                className={clsx(
                  "w-full md:w-80 rounded-md border cursor-pointer py-10 flex justify-center items-center",
                  {
                    "border-gray-200": !isDark,
                    "border-dark-dark-border": isDark,
                    "text-dark-dark-border": isDark,
                  }
                )}
              >
                {loadingLogoImage ? (
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
            {state?.errors?.logo_url_valid ? (
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

        <div className="mb-6 md:w-fit">
          <div className="mb-2 block text-sm font-medium">Logo blanco</div>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <label
                htmlFor="logo_opacity_url_valid"
                className={clsx(
                  "w-full md:w-80 rounded-md border cursor-pointer py-10 flex justify-center items-center",
                  {
                    "border-gray-200": !isDark,
                    "border-dark-dark-border": isDark,
                    "text-dark-dark-border": isDark,
                  }
                )}
              >
                {loadingOpacityLogoImage ? (
                  <span className="loader"></span>
                ) : logoOpacityImage ? (
                  <Image
                    src={logoOpacityImage}
                    width={320}
                    height={106}
                    alt="logo"
                  />
                ) : (
                  "Subir imagen"
                )}
              </label>
              <input
                id="logo_opacity_url_valid"
                onChange={handleChangeInputLogoOpacity}
                name="logo_opacity_url_valid"
                type="file"
                className="border-none outline-0 opacity-0 absolute top-0 w-full h-full"
                aria-describedby="logo_opacity_url_valid-error"
              />
            </div>
            {state?.errors?.logo_opacity_url_valid ? (
              <div
                id="logo_opacity_url_valid-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.logo_opacity_url_valid.map((error: string) => (
                  <p className="text-[14px]" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* colors */}
        <WrapperColorPicker />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          type="submit"
          className="flex mt-3 h-10 items-center rounded-lg bg-primary-button-500 p-6 text-base  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2"
        >
          Guardar ajustes
        </Button>
      </div>
    </form>
  );
}
