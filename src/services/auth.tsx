// services/auth.tsx

import { API_URL } from "@/lib/api";

export type LoginResult = {
  id_user: string;
  username: string;
  nama_user: string;
};

export async function login(username: string, password: string) {
  const params = new URLSearchParams({
    path: "login",
    username,
    password,
  });

  const res = await fetch(`${API_URL}?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Server tidak dapat dihubungi");
  }

  return res.json();
}
