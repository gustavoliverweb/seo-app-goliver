"use client";

// import { useFormState } from "react-dom";
// import { createProduct } from "@/app/lib/actions";

export default function CreateReportForm() {
  // const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(createProduct, initialState);
  // console.log(state);
  return (
    // <form action={dispatch}>
    {
      /* <div className="rounded-md  p-4 md:p-6 text-primary-text-500">
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
              <select
                id="select-template"
                name="select-template"
                aria-describedby="select-template-error"
                className="w-full md:w-80 rounded-md  border border-gray-200 px-4 py-2"
              >
                <option>Plantilla 1</option>
                <option>Plantilla 2</option>
                <option>Plantilla 3</option>
              </select>
            </div>
            {state.errors?.name ? (
              <div
                id="select-template-error"
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
            htmlFor="name"
            className="mb-2 block text-[1.125rem] font-medium"
          >
            Nombre de la empresa
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
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
            htmlFor="name"
            className="mb-2 block text-[1.125rem] font-medium"
          >
            Url del sitio
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
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
          <div className="mb-2 block text-[1.125rem] font-medium">
            Kit digital
          </div>

          <div className="flex gap-3">
            <div className="relative mt-2 rounded-md">
              <div className="relative flex items-center gap-2">
                <input
                  id="radio-si"
                  name="name"
                  type="radio"
                  placeholder="Introduce el nombre de la agencia"
                  // className="block w-full md:w-80 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="name-error"
                />
                <label htmlFor="radio-si">Si</label>
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
            <div className="relative mt-2 rounded-md">
              <div className="relative flex items-center gap-2">
                <input
                  id="radio-no"
                  name="name"
                  type="radio"
                  placeholder="Introduce el nombre de la agencia"
                  // className="block w-full md:w-80 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="name-error"
                />
                <label htmlFor="radio-no">No</label>
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
        </div>
      </div> */
    }
    // </form>
  );
}
