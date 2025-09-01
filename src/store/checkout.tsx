import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Ticket } from "../services/Apis/checkout/checkout.types";
interface Username {
  username: string;
  role: string;
  token: string;
  setUserName: (user: string, role: string, token: string) => void;
}
interface TicketDetail {
  ticketDetails: Ticket;
  setTicketDetails: (ticket: Ticket) => void;
}

const staticTicket = {
  ticketId: "",
  checkinAt: "",
  checkoutAt: "",
  durationHours: 0,
  breakdown: [
    {
      from: "",
      to: "",
      hours: 0,
      rateMode: "",
      rate: 0,
      amount: 0,
    },
  ],
  amount: 0,
  zoneState: {
    id: "",
    name: "",
    zoneId: "",
    categoryId: "",
    gateIds: ["", "", ""],
    totalSlots: 0,
    occupied: 0,
    free: 0,
    reserved: 0,
    availableForVisitors: 0,
    availableForSubscribers: 0,
    rateNormal: 0,
    rateSpecial: 0,
    open: true,
  },
};

export const useUserName = create<Username>()(
  persist(
    (set) => ({
      username: "",
      role: "",
      token: "",
      setUserName: (user, userRole, token) =>
        set({ username: user, role: userRole, token: token }),
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useTicketDetails = create<TicketDetail>((set) => ({
  ticketDetails: staticTicket,
  setTicketDetails: (ticket) => set({ ticketDetails: ticket }),
}));
