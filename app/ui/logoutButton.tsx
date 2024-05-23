import { signOut } from "@/auth";
import LogoutButtonUi from "./logoutButtonUi";

export async function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <LogoutButtonUi />
    </form>
  );
}
