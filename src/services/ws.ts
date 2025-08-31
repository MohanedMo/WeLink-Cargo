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
      const msg = JSON.parse(ev.data);
      if (msg.type === "zone-update") {
        const zone = msg.payload as Partial<Zone> & { id: string };
        const newZones = zonesData.map((z) =>
          z.id === zone.id ? { ...z, ...zone } : z
        );

        setZones(newZones as Zone[]);
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
