import { baseApiUrl } from "../api-constant";
import { useUserName } from "../../../store/checkout";
import type { EditCategoryBody, ToggleZone } from "./admin.types";

export async function categories() {
  const res = await fetch(`${baseApiUrl}/master/categories`);

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  return data;
}
export async function editCategory(body: EditCategoryBody) {
  const { token } = useUserName.getState();

  if (!token) return;

  const res = await fetch(`${baseApiUrl}/admin/categories/${body.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      rateNormal: body.rateNormal,
      rateSpecial: body.rateSpecial,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  return data;
}
export async function getSubscriptios() {
  const { token } = useUserName.getState();

  if (!token) return;

  const res = await fetch(`${baseApiUrl}/admin/subscriptions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  console.log(data);

  return data;
}
export async function getZones() {
  const res = await fetch(`${baseApiUrl}/master/zones`);

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  return data;
}
export async function toggleZone(body: ToggleZone) {
  const { token } = useUserName.getState();

  if (!token) return;

  const res = await fetch(
    `${baseApiUrl}/admin/zones/${body.zoneId}/open`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        open: body.status,
        zoneId: body.zoneId
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  return data;
}

export const adminApis = { categories, editCategory, getZones, toggleZone };
