// hooks/useLogout.ts
"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("cartItems");

    router.push("/");
  }

  return logout;
}
