import {
  User,
  userDefault0,
  userDefault1,
  userDefault2,
  userDefault3,
  userDefault4,
} from "./user";

export interface Net {
  user: User;
  paid: number;
  amount: number;
  balance: number;
}

export interface NetInfo {
  totalAmount: number;
  members: Array<Net>;
}

export const netDefault0 = <Net>{
  user: userDefault0,
  paid: 20000,
  amount: 50000,
  balance: -30000,
};
export const netDefault1 = <Net>{
  user: userDefault1,
  paid: 20000,
  amount: 50000,
  balance: -30000,
};
export const netDefault2 = <Net>{
  user: userDefault2,
  paid: 20000,
  amount: 50000,
  balance: -30000,
};
export const netDefault3 = <Net>{
  user: userDefault3,
  paid: 20000,
  amount: 50000,
  balance: -30000,
};
export const netDefault4 = <Net>{
  user: userDefault4,
  paid: 20000,
  amount: 50000,
  balance: -30000,
};
export const netInfoDefault = <NetInfo>{
  totalAmount: -3000000,
  members: [netDefault0, netDefault1, netDefault2, netDefault3, netDefault4],
};
