/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { updateUser } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Button } from "../button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserType } from "@/app/lib/definitions";
import SuccessModal from "../successModal";

const usersRoles = [{ rol: "SEO Manager" }, { rol: "Admin" }];

export default function EditUserForm({ user }: { user: UserType | undefined }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateUser, initialState);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const { message } = state;
  console.log(state);

  useEffect(() => {
    if (message) {
      console.log(message);
      setShowModalSuccess(true);
    }
  }, [message]);

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true);
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return;
    const reader = new FileReader();
    // const name = agencyName.trim().replace(" ", "");
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const base64String = e.target?.result as string;
      const upLoadImage = await fetch(
        `/api/uploadUserAvatar?user_name=${userName}`,
        {
          method: "POST",
          body: JSON.stringify({ files: base64String }),
        }
      );
      const uploadResult = await upLoadImage.json();
      setAvatarUrl(uploadResult.uploadedImages.secure_url);
      setLoadingImage(false);
      setAvatarImage(base64String);
    };

    reader.readAsDataURL(file);
  };
  return (
    <>
      <SuccessModal showModal={showModalSuccess} top="top-1/2">
        <div>
          <div className="text-[24px] text-errors-success-dark font-medium">
            Éxito
          </div>
          <div className="text-errors-success-dark text-[18px]">
            El usuario fue actualizado
          </div>
        </div>
      </SuccessModal>
      <form action={dispatch}>
        <input type="hidden" name="id" value={user?.id} />
        <div className="rounded-md  p-4 md:p-6">
          <div className="text-[1.3rem]">Información del usuario</div>

          <div className="mt-6 mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Nombre del usuario
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  onChange={(e) => setUserName(e.target.value)}
                  defaultValue={user?.name}
                  name="name"
                  type="text"
                  placeholder="Introduce el nombre del usuario"
                  className="block w-full md:w-80 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
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
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Correo
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  defaultValue={user?.email}
                  type="text"
                  placeholder="Introduce un correo"
                  className="block w-full md:w-80 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="email-error"
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

          <div className="mt-6 mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Contraseña
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Introduce una contraseña"
                  className="block w-full md:w-80 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="password-error"
                />
              </div>
              {state.errors?.password ? (
                <div
                  id="password-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.password.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 mb-4">
            <label
              htmlFor="user_role"
              className="mb-2 block text-sm font-medium"
            >
              Rol
            </label>
            <div className="relative mt-2 rounded-md w-full md:w-fit">
              <div className="relative">
                <select
                  name="user_role"
                  id="user_role"
                  className="w-full md:w-80 rounded-md  border border-gray-200 px-4 py-2"
                >
                  {/* <option value="">Selecciona un rol</option> */}
                  {usersRoles.map((role) => (
                    <option
                      // selected={role.rol === user?.user_role}
                      key={role.rol}
                      defaultValue={user?.user_role}
                    >
                      {role.rol}
                    </option>
                  ))}
                </select>
              </div>
              {state.errors?.user_role ? (
                <div
                  id="user_role-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.user_role.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mb-4 mt-10">
            <div className="mb-2 block text-sm font-medium">Avatar</div>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <label
                  htmlFor="user_avatar_valid"
                  className="w-full md:w-80 rounded-md border border-gray-200 cursor-pointer py-10 flex justify-center items-center"
                >
                  {user?.user_avatar ? (
                    <>
                      {loadingImage ? (
                        <span className="loader"></span>
                      ) : (
                        <Image
                          src={avatarImage ? avatarImage : user?.user_avatar}
                          width={320}
                          height={106}
                          alt="logo"
                        />
                      )}
                    </>
                  ) : loadingImage ? (
                    <span className="loader"></span>
                  ) : avatarImage ? (
                    <Image
                      src={user?.user_avatar ? user?.user_avatar : avatarImage}
                      width={320}
                      height={106}
                      alt="logo"
                    />
                  ) : (
                    "Subir imagen"
                  )}
                  {/* {loadingImage ? (
                  <span className="loader"></span>
                ) : avatarImage ? (
                  <Image
                    src={user?.user_avatar ? user?.user_avatar : avatarImage}
                    width={320}
                    height={106}
                    alt="logo"
                  />
                ) : (
                  "Subir imagen"
                )} */}
                </label>
                <input
                  id="user_avatar_valid"
                  onChange={handleChangeAvatar}
                  name="user_avatar_valid"
                  type="file"
                  className="border-none outline-0 opacity-0 absolute top-0 w-full h-full "
                  aria-describedby="user_avatar_valid-error"
                />
                <input
                  type="text"
                  name="user_avatar"
                  value={avatarUrl ? avatarUrl : user?.user_avatar}
                  // defaultValue={user?.user_avatar}
                  readOnly
                  hidden
                />
              </div>
              {state.errors?.user_avatar_valid ? (
                <div
                  id="user_avatar_valid-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.user_avatar_valid.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="submit"
            className="flex mt-3 h-10 items-center rounded-lg  bg-primary-button-500 px-6 py-6 text-[18px]  text-white transition-colors hover:bg-secondary-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            disabled={loadingImage ? true : false}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
}
