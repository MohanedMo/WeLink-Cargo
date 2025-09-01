import { baseApiUrl } from "../api-constant";
import { useUserName } from "../../../store/checkout";
import type { EditCategoryBody, RushHour, ToggleZone, Vacation } from "./admin.types";

  const { token } = useUserName.getState();


async function categories() {
  const res = await fetch(`${baseApiUrl}/master/categories`);

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  return data;
}
 async function editCategory(body: EditCategoryBody) {

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
 async function getSubscriptios() {

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
 async function getZones() {
  const res = await fetch(`${baseApiUrl}/admin/reports/parking-state`);

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  return data;
}
 async function toggleZone(body: ToggleZone) {

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
 async function addRushHour(body: RushHour) {

  if (!token) return;

  const res = await fetch(
    `${baseApiUrl}/admin/rush-hours`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        weekday: body.weekDay,
        from: body.from,
        to: body.to
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  return data;
}
 async function addVacation(body: Vacation) {

  if (!token) return;

  const res = await fetch(
    `${baseApiUrl}/admin/vacations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: body.name,
        from: body.from,
        to: body.to
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }

  const data = res.json();

  return data;
}

export const adminApis = { categories, editCategory, getZones, toggleZone, addRushHour, addVacation };
