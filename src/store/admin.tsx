import { create } from "zustand";

import { staticZones } from "./gate";
import type { Category } from "../services/Apis/admin/admin.types";
import type { Zone } from "../services/Apis/gate page/gate.types";

interface CategoryData {
  categoriesData: Category[];
  setCategoriesData: (categories: Category[]) => void;
}
interface LogData {
  logData: { adminId: string; action: string; timestamp: string }[];
  setLogData: (
    log: { adminId: string; action: string; timestamp: string }[]
  ) => void;
}
interface ZoneData {
  zonesAdminData: Zone[];
  setZonesData: (zones: Zone[]) => void;
}
const categoriesStatic = [
  {
    id: "",
    name: "",
    rateNormal: 0,
    rateSpecial: 0,
  },
];

export const useCategoriesData = create<CategoryData>((set) => ({
  categoriesData: categoriesStatic,
  setCategoriesData: (categories) => set({ categoriesData: categories }),
}));
export const useLogData = create<LogData>((set) => ({
  logData: [{ adminId: "", action: "", timestamp: "" }],
  setLogData: (log) => set({ logData: log }),
}));
export const useAdminZones = create<ZoneData>((set) => ({
  zonesAdminData: staticZones,
  setZonesData: (zones) => set({ zonesAdminData: zones }),
}));
