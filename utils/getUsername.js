import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUsername() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username");

  if (!username) {
    redirect("/");
  }

  return username.value;
}
