import { baseApiUrl } from '../api-constant';
import type { BookTicketBodyVisitor, BookTicketBodySubscriber, Gate } from './gate.types';
import type {Zone}  from './gate.types';


export async function getGates(): Promise<Gate[]> {
  const res = await fetch(`${baseApiUrl}/master/gates`);

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }
  
  const data = res.json()

  return data
}
export async function getZonesByGate(gateId: string | undefined): Promise<Zone[]> {
  const res = await fetch(`${baseApiUrl}/master/zones?gateId=${gateId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }
  
  const data = res.json()

  return data
}
export async function bookTicket(body: BookTicketBodyVisitor | BookTicketBodySubscriber) {
  const res = await fetch(`${baseApiUrl}/tickets/checkin`,{
    method: 'POST',
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }
  
  const data = res.json()

  return data
}
export async function subscriptionIdValidation(subscriberId: string) {
  const res = await fetch(`${baseApiUrl}/subscriptions/${subscriberId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch zones: ${res.status}`);
  }
  
  const data = res.json()

  return data
}

export const gateApis = {getGates, getZonesByGate, bookTicket, subscriptionIdValidation}