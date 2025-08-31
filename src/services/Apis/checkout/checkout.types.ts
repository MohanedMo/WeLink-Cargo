import type { Zone } from "../gate page/gate.types";

export interface LoginBody {
  username: string;
  password: string;
}
export interface LoginRes {
  user: {
    id: string;
    username: string;
    role: string;
  };
  token: string;
}
export interface Ticket {
  ticketId: string;
  checkinAt: string;
  checkoutAt: string;
  durationHours: number;
  breakdown: {
    from: string;
    to: string;
    hours: number;
    rateMode: string;
    rate: number;
    amount: number;
  }[];
  amount: number;
  zoneState: Zone
}
