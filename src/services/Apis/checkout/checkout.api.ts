import { baseApiUrl } from "../api-constant";
import type { LoginBody } from "./checkout.types";

export async function login(body: LoginBody) {
  const res = await fetch(`${baseApiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  return data;
}
export async function ticketDetails(ticketId: string) {
  const res = await fetch(`${baseApiUrl}/tickets/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticketId: ticketId }),
  });

  const data = res.json();

  return data;
}

export const checkoutApis = { login, ticketDetails };
