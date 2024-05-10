/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";

import { Button } from "../button";
import { useFormState } from "react-dom";
import { CreateReportAction } from "@/app/lib/actions";
import { useState } from "react";
import { AgencyTemplate, UserType } from "@/app/lib/definitions";
import SuccessModal from "../successModal";
import ErrorModal from "../errorModal";

export default function SendReportForm({
  templateData,
  users,
}: {
  templateData: AgencyTemplate[];
  users: UserType[];
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(CreateReportAction, initialState);
  const [templateId, setTemplateId] = useState<string | unknown>("");
  const [radioYes, setRadioYes] = useState<boolean>(false);
  const [radioNo, setRadioNo] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [companyUrl, setCompanyUrl] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [loadingSendMail, setLoadingSendMail] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const option = target.options[target.selectedIndex];
    // console.log(option.getAttribute("data-id"));
    setTemplateId(option?.getAttribute("data-id"));
  };

  const handleOnChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target.id === "yes_radio") {
      setRadioYes(true);
      setRadioNo(false);
    } else {
      setRadioNo(true);
      setRadioYes(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSendMail(true);
    const formData = new FormData(e.currentTarget);
    formData.append("company_name", companyName);
    formData.append("company_url", companyUrl);
    formData.append("kit_digital", radioYes ? "si" : "no");

    const sendMail = await fetch("/api/sendMail", {
      method: "POST",
      body: formData,
    });
    const result = await sendMail.json();
    console.log(sendMail);
    console.log(result);
    if (sendMail.ok) {
      setShowModalSuccess(true);
      setTimeout(() => {
        setShowModalSuccess(false);
      }, 2000);
    } else {
      setShowModalError(true);
      setTimeout(() => {
        setShowModalError(false);
      }, 2000);
    }
    setLoadingSendMail(false);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser("");
    setEmailValue(e.target.value);
  };

  const handleChangeSelectedUser = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEmailValue("");
    setSelectedUser(e.target.value);
  };

  return (
    <>
      <div className="fake-div rounded-br-2xl hidden lg:block col-start-2 bg-white"></div>
      <SuccessModal showModal={showModalSuccess}>
        <div>
          <div className="text-[24px] text-errors-success-dark font-medium">
            Éxito
          </div>
          <div className="text-errors-success-dark text-[18px]">
            El correo se envío correctamente
          </div>
        </div>
      </SuccessModal>
      <ErrorModal showModal={showModalError} top="top-1/2">
        <div>
          <div className="text-[24px] text-errors-error-dark font-medium">
            Error
          </div>
          <div className="text-errors-error-dark text-[18px]">
            Hubo un error al enviar el correo
          </div>
        </div>
      </ErrorModal>
      <form
        action={dispatch}
        className="form-grid-report bg-[#F0F1F3] lg:col-start-1 lg:row-start-1 lg:row-end-3 lg:grid lg:grid-cols-1 lg:grid-rows-2 lg:gap-y-6"
      >
        <div className="rounded-bl-2xl rounded-br-2xl lg:rounded-br-[0px] p-4 md:p-6 text-primary-text-500 bg-[#FFFFFF]">
          <div className="text-[1.438rem]">Información del cliente</div>
          <div className="mt-8 mb-4">
            <label
              htmlFor="select-template"
              className="mb-2 block text-[1.125rem] font-medium"
            >
              Seleccionar plantilla
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  name="agency_id"
                  value={templateId as string}
                  hidden
                  readOnly
                />
                <select
                  id="select_template"
                  onChange={handleChange}
                  name="select_template"
                  defaultValue=""
                  aria-describedby="select_template-error"
                  className="w-full md:w-80 rounded-md  border border-gray-200 px-4 py-2"
                >
                  <option value="">Seleccionar plantilla</option>
                  {templateData &&
                    templateData.map((template) => (
                      <option
                        key={template.id}
                        data-id={template.id}
                        value={template.name}
                      >
                        {template.name}
                      </option>
                    ))}
                </select>
              </div>
              {state.errors?.select_template ? (
                <div
                  id="select_template-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.select_template.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 mb-4">
            <label
              htmlFor="name"
              className="mb-2 block text-[1.125rem] font-medium"
            >
              Nombre de la empresa
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  onChange={(e) => setCompanyName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Introduce el nombre de la agencia"
                  className="block w-full md:w-80 rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="name-error"
                />
              </div>
              {state.errors?.name ? (
                <div
                  id="name-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.name.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 mb-4">
            <label
              htmlFor="url_site"
              className="mb-2 block text-[1.125rem] font-medium"
            >
              Url del sitio
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  id="url_site"
                  name="url_site"
                  type="text"
                  placeholder="Introduce el nombre de la agencia"
                  className="block w-full md:w-80 rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="url_site-error"
                />
              </div>
              {state.errors?.url_site ? (
                <div
                  id="url_site-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.url_site.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 mb-4">
            <div className="mb-2 block text-[1.125rem] font-medium">
              Kit digital
            </div>

            <div className="flex gap-3">
              <fieldset className="flex gap-3">
                <div className="relative mt-2 rounded-md">
                  <div className="relative flex items-center gap-2">
                    <input
                      id="yes_radio"
                      onChange={handleOnChangeRadio}
                      name="yes_radio"
                      type="radio"
                      aria-describedby="yes_radio-error"
                      checked={radioYes}
                    />
                    <label htmlFor="yes_radio">Si</label>
                  </div>
                  {state.errors?.yes_radio ? (
                    <div
                      id="yes_radio-error"
                      aria-live="polite"
                      className="mt-2 text-sm text-red-500"
                    >
                      {state.errors.yes_radio.map((error: string) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="relative mt-2 rounded-md">
                  <div className="relative flex items-center gap-2">
                    <input
                      id="no_radio"
                      onChange={handleOnChangeRadio}
                      name="no_radio"
                      type="radio"
                      aria-describedby="no_radio-error"
                      checked={radioNo}
                    />
                    <label htmlFor="no_radio">No</label>
                  </div>
                  {state.errors?.no_radio ? (
                    <div
                      id="no_radio-error"
                      aria-live="polite"
                      className="mt-2 text-sm text-red-500"
                    >
                      {state.errors.no_radio.map((error: string) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="flex mt-6 lg:mt-0  lg:h-full rounded-tl-2xl rounded-tr-2xl lg:rounded-tr-[0px] items-center justify-center text-primary-text-500 bg-[#FFFFFF]">
          <div className="flex justify-center">
            <div className="mt-6 flex justify-center w-full ">
              <Button
                type="submit"
                className="w-full justify-center px-8 py-6 text-[1.125rem] lg:w-80 bg-secondary-green-500 text-primary-text-500"
              >
                Crear informe
              </Button>
            </div>
          </div>
        </div>
      </form>
      {/* /////send report */}
      <form
        onSubmit={handleSubmit}
        className="form-grid-mail rounded-tr-0 pt-6 lg:mt-0 bg-white lg:col-start-2 lg:row-start-2"
      >
        <div className="w-full p-4 md:p-6">
          <div className="mt-6 mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-[1.125rem] font-medium"
            >
              Correo
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  onChange={handleChangeEmail}
                  id="email"
                  name="email"
                  type="text"
                  value={selectedUser ? "" : emailValue}
                  placeholder="Introduce un correo"
                  className="block w-full rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-opacity-500"
                  aria-describedby="email-error"
                  // readOnly
                />
              </div>
              {state.errors?.email ? (
                <div
                  id="email-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.email.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="text-text-opacity-500 text-[1.125rem] mt-6 mb-1 ">
            Tambien puedes
          </div>

          <div className="mt-6 mb-4">
            <label
              htmlFor="select_user"
              className="mb-2 block text-[1.125rem] font-medium"
            >
              Selecciona un usuario
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <select
                  onChange={handleChangeSelectedUser}
                  id="select_user"
                  name="select_user"
                  className="block w-full  rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 text-text-opacity-500"
                  aria-describedby="select_user-error"
                  value={emailValue ? "" : selectedUser}
                >
                  <option value="">Selecciona un usuario</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.email}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
              {state.errors?.select_user ? (
                <div
                  id="select_user-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.select_user.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 mb-4">
            <label
              htmlFor="subject"
              className="mb-2 block text-[1.125rem] font-medium"
            >
              Asunto
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea
                  id="subject"
                  name="subject"
                  value={`Nueva solicitud SEO - ${companyName}`}
                  // type="text"
                  // placeholder="Introduce el nombre de la agencia"
                  className="block w-full  rounded-md border border-gray-200 px-4 py-2 text-sm outline-2"
                  aria-describedby="subject-error"
                  readOnly
                />
              </div>
              {state.errors?.subject ? (
                <div
                  id="subject-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.subject.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-6 flex  gap-4">
            <Button
              type="submit"
              className="bg-primary-button-500 w-full justify-center px-8 py-6 text-[1.125rem]"
            >
              {loadingSendMail ? (
                <div className="loader-send-mail"></div>
              ) : (
                "Enviar informe"
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
