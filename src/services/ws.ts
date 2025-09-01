import { useAdminZones, useCategoriesData, useLogData } from "../store/admin";
import { useZonesData } from "../store/gate";

import type { Zone } from "./Apis/gate page/gate.types";

let socket = new WebSocket("ws://localhost:3000/api/v1/ws");

export let status: string = "Connecting";

export const connectWS = (gateId: string = "gate_1") => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket("ws://localhost:4000");
  }

  const subscribe = () => {
    status = "Connected";
    socket?.send(JSON.stringify({ type: "subscribe", payload: { gateId } }));
  };

  if (socket.readyState === WebSocket.OPEN) {
    subscribe();
  } else {
    socket.onopen = subscribe;
  }

  socket.onmessage = (ev) => {
    try {
      const { setZones, zonesData } = useZonesData.getState();
      const { categoriesData, setCategoriesData } =
        useCategoriesData.getState();
      const { logData, setLogData } = useLogData.getState();
      const { zonesAdminData, setZonesData } = useAdminZones.getState();
      const msg = JSON.parse(ev.data);
      if (msg.type === "zone-update") {
        const zone = msg.payload as Partial<Zone> & { id: string };
        const newZones = zonesData.map((z) =>
          z.id === zone.id ? { ...z, ...zone } : z
        );

        setZones(newZones as Zone[]);
      }
      if (msg.type === "admin-update") {
        const { adminId, targetId, action, details, timestamp } = msg.payload;
        const newLog = logData.filter((l) => l.adminId.length !== 0);
        setLogData([...newLog, { adminId, action, timestamp }]);

        if (action === "category-rates-changed") {
          const newCategories = categoriesData.map((c) =>
            c.id === targetId ? { ...c, ...details } : c
          );
          setCategoriesData(newCategories);
        }
        if (action === "zone-closed" || action === "zone-opened") {
          const newZones = zonesAdminData.map((z) =>
            z.zoneId === targetId ? { ...z, ...details } : z
          );
          setZonesData(newZones);
        }
      }
    } catch (e) {
      console.error("WS parse error", e);
    }
  };

  socket.onclose = (event) => {
    status = "Disconnected";
    console.warn("❌ Disconnected from server", event.reason);
  };

  return socket;
};
