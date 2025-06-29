"use server";

import { cookies } from "next/headers";

export async function setToken(tokenName: string, tokenValue: string) {
  const cookieStore = await cookies();
  cookieStore.set(tokenName, tokenValue, {
    httpOnly: true,
  });
}

export async function RemoveToken(tokenName: string) {
  const cookieStore = await cookies();
  cookieStore.delete("userId");
}
