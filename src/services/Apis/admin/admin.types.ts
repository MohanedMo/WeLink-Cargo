export interface Category {
  id: string;
  name: string;
  rateNormal: number;
  rateSpecial: number;
}
export interface EditCategoryBody {
  id: string;
  rateNormal: number;
  rateSpecial: number;
}
export interface ToggleZone {
  zoneId: string;
  status: boolean;
}
export interface RushHour {
  weekDay: string;
  from: string;
  to: string;
}
export interface Vacation {
  name: string;
  from: string;
  to: string;
}
