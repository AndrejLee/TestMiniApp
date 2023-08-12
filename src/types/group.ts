import { GroupCateId } from "./category";
import { User } from "./user";

export interface Group {
  id: number;
  name: string;
  numberOfMembers: number;
  category: GroupCateId;
  status: string;
  owner: User;
  members: Array<User>;
}
