import { GroupCateId } from "./category";
import { groupMembersDefault, User, userDefault0, userDefault1 } from "./user";

export interface Group {
  id: number;
  name: string;
  numberOfMembers: number;
  category: GroupCateId;
  status: string;
  owner: User;
  members: Array<User>;
}

export const groupDefault = <Group>{
  id: 0,
  name: "Miền tây",
  numberOfMembers: groupMembersDefault.length,
  category: "TRIP",
  status: "Unknown",
  owner: userDefault0,
  members: groupMembersDefault,
};

export const groupDefault1 = <Group>{
  id: 1,
  name: "Hackathon",
  numberOfMembers: groupMembersDefault.length,
  category: "COUPLE",
  status: "Unknown",
  owner: userDefault1,
  members: groupMembersDefault,
};

export const groupDefault2 = <Group>{
  id: 2,
  name: "Khó nói",
  numberOfMembers: groupMembersDefault.length,
  category: "OTHER",
  status: "Unknown",
  owner: userDefault1,
  members: groupMembersDefault,
};

export const groupDefault3 = <Group>{
  id: 3,
  name: "Nhà nguyên căn",
  numberOfMembers: groupMembersDefault.length,
  category: "HOME",
  status: "Unknown",
  owner: userDefault1,
  members: groupMembersDefault,
};
