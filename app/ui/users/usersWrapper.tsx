"use client";
import { UsersCard } from "./usersCard";
import ConfirmModal from "../confirmModal";
import { useState } from "react";
import { deleteUser } from "@/app/lib/actions";
import { UserType } from "@/app/lib/definitions";
import { CreateUser } from "../buttons";
import clsx from "clsx";
import { useStore } from "@/app/lib/store";

export default function UsersWrapper({ users }: { users: UserType[] }) {
  const { isDark, setIsModalDeleteShow } = useStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const name = users.find((user) => user.id === userId)?.name;
  const deleteUserWithId = deleteUser.bind(null, userId);

  if (!users?.length) {
    return (
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div
          className={clsx(
            "p-5 rounded-2xl lg:flex justify-between items-center w-full transition",
            {
              "bg-white": !isDark,
              "bg-dark-dark-background-panels": isDark,
            }
          )}
        >
          <h3
            className={clsx("text-title font-medium transition", {
              "text-primary-text-500": !isDark,
              "text-white": isDark,
            })}
          >
            Usuarios
          </h3>
          <CreateUser />
        </div>
        <div
          className={clsx(
            " h-max overflow-auto p-5 rounded-2xl w-full flex-grow flex flex-col justify-between transition",
            {
              "bg-white": !isDark,
              "bg-dark-dark-background-panels": isDark,
            }
          )}
        >
          <div className="flex justify-center items-center flex-col gap-4 flex-1 text-[24px]">
            No hay coincidencias
          </div>
        </div>
      </div>
    );
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userId);
    await fetch(`/api/deleteUserCloud?user_name=${name}`, {
      method: "POST",
    });
    await deleteUserWithId();
    setShowModal(false);
    setIsModalDeleteShow(false);
  };
  return (
    <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
      <div
        className={clsx(
          "p-5 rounded-2xl lg:flex justify-between items-center w-full transition",
          {
            "bg-white": !isDark,
            "bg-dark-dark-background-panels": isDark,
          }
        )}
      >
        <h3
          className={clsx("text-title font-medium transition", {
            "text-primary-text-500": !isDark,
            "text-white": isDark,
          })}
        >
          Usuarios
        </h3>
        <CreateUser />
      </div>
      <div
        className={clsx(
          " h-max overflow-auto p-5 rounded-2xl w-full flex-grow flex flex-col justify-between transition",
          {
            "bg-white": !isDark,
            "bg-dark-dark-background-panels": isDark,
          }
        )}
      >
        <div className="flex flex-col gap-4">
          {users &&
            users.map((user) => (
              <div key={user.id}>
                <UsersCard
                  user={user}
                  setUserId={setUserId}
                  setShowModal={setShowModal}
                />
              </div>
            ))}
        </div>
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
        >
          ¿Estás seguro de eliminar el usuario?
        </ConfirmModal>
      </div>
    </div>
  );
}
