export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export const userDefault0 = <User>{ name: "Lộc", id: "0", avatarUrl: "" };
export const userDefault1 = <User>{ name: "Dương", id: "1", avatarUrl: "" };
export const userDefault2 = <User>{ name: "Giang", id: "2", avatarUrl: "" };
export const userDefault3 = <User>{ name: "Hân", id: "3", avatarUrl: "" };
export const userDefault4 = <User>{ name: "Anh", id: "4", avatarUrl: "" };
export const groupMembersDefault = [
  userDefault0,
  userDefault1,
  userDefault2,
  userDefault3,
  userDefault4,
];
