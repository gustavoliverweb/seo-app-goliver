import { UserType } from "@/app/lib/definitions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { EditUser } from "../buttons";

export function UsersCard({
  user,
  setUserId,
  setShowModal,
}: {
  user: UserType;
  setUserId: (clientId: string) => void;
  setShowModal: (showModal: boolean) => void;
}) {
  const handleDeleteUser = () => {
    // console.log("Delete report", name);
    setUserId(user.id);
    setShowModal(true);
  };

  return (
    <div className=" relative">
      <div className="rounded-md border border-gray-200 flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          {user.user_avatar ? (
            <Image
              src={user.user_avatar}
              width={50}
              height={50}
              alt="Avatar"
              className="rounded-full"
            />
          ) : (
            <div className="empty-avatar">{user.name[0].toUpperCase()}</div>
          )}

          <div className="flex flex-col gap-1">
            <div className="text-[18px] font-semibold">{user.name}</div>
            <div className="text-[14px] capitalize">{user.user_role}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <EditUser id={user?.id} />
        </div>
        <div className="absolute top-[4px] right-[4px]">
          <div
            className="flex text-white items-center rounded-full p-1  bg-secondary-green-500 cursor-pointer hover:bg-green-600 transition-colors"
            onClick={handleDeleteUser}
          >
            {<XMarkIcon className="h-4 w-4 " />}
          </div>
        </div>
      </div>
    </div>
  );
}
