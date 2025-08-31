import { create } from "zustand";
import type {
  Gate,
  Zone,
  TicketModel,
} from "../services/Apis/gate page/gate.types";

interface UserType {
  userType: string;
  changeUserType: (userType: string) => void;
}
interface GateData {
  gateData: Gate;
  setGateData: (gateData: Gate) => void;
}
interface ZonesData {
  zonesData: Zone[];
  setZones: (setZones: Zone[]) => void;
}
interface TicketModelData {
  ticketData: TicketModel;
  isModelOpen: boolean;
  setModelStatus: (status: boolean) => void;
  setTicketData: (setTicketData: TicketModel) => void;
}
const staticZones = [
  {
    id: "",
    name: "",
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
];
const ticketStaticData = {
    ticket:{
        id: "",
        type: "",
        zoneId: "",
        gateId: "",
        checkinAt: "",
        checkoutAt: null,
    },
  zoneState: {
    id: "",
    name: "",
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

export const useUserType = create<UserType>((set) => ({
  userType: "visitor",
  changeUserType: (userType) => set({ userType: userType }),
}));
export const useGateData = create<GateData>((set) => ({
  gateData: { id: "", name: "", zoneIds: [], location: "" },
  setGateData: (gateData) => set({ gateData: gateData }),
}));
export const useZonesData = create<ZonesData>((set) => ({
  zonesData: staticZones,
  setZones: (zones) => set({ zonesData: zones }),
}));
export const useTicketData = create<TicketModelData>((set) => ({
  ticketData: ticketStaticData,
  isModelOpen: false,
  setModelStatus: (status) => set({isModelOpen: status}),
  setTicketData: (ticket) => set({ ticketData: ticket }),
}));
