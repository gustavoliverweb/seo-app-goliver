"use client";
import { UsersCard } from "./usersCard";
import ConfirmModal from "../confirmModal";
import { useState } from "react";
import { deleteUser } from "@/app/lib/actions";
import { UserType } from "@/app/lib/definitions";

export default function UsersWrapper({ users }: { users: UserType[] }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const name = users.find((user) => user.id === userId)?.name;
  const deleteUserWithId = deleteUser.bind(null, userId);

  if (!users?.length) {
    return (
      <div className="flex flex-grow justify-center items-center">
        No hay usuarios creados
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
  };
  return (
    <div>
      <div className="bg-white flex flex-col gap-4  mt-6">
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
  );
}
