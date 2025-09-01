export interface Gate {
  id: string;
  name: string;
  zoneIds: string[];
  location: string;
}

export interface Zone {
  id: string;
  name: string;
  zoneId: string
  categoryId: string;
  gateIds: string[];
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  rateNormal: number;
  rateSpecial: number;
  subscriberCount?: number
  open: boolean;
}
export interface BookTicketBodyVisitor {
  gateId: string;
  zoneId: string;
  type: string;
}
export interface BookTicketBodySubscriber {
  gateId: string;
  zoneId: string;
  subscriptionId: string;
  type: string;
}
export interface TicketModel {
  ticket: {
    id: string;
    type: string;
    zoneId: string;
    gateId: string;
    checkinAt: string;
    checkoutAt: null;
  };
  zoneState: Zone
}
