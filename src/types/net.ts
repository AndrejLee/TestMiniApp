import { User } from "./user";

export interface Net {
  user: User;
  paid: number;
  amount: number
  balance: number,
}

export interface NetInfo {
  totalAmount: number;
  members: Array<Net>;
}
