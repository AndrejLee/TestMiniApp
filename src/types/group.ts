import { GroupCateId } from "./category";
import { groupMembersDefault, User, userDefault0 } from "./user";

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
  name: "Hackathon",
  numberOfMembers: groupMembersDefault.length,
  category: "TRIP",
  status: "Unknown",
  owner: userDefault0,
  members: groupMembersDefault,
};
