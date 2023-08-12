export interface Net {
  id: number;
  name: string;
  avatar: string;
  net: number;
  status: string;
}

export interface NetInfo {
  payed: number;
  members: Array<Net>;
}
