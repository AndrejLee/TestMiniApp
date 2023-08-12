import { User } from "./user";

export interface Group {
  id: number
  name: string
  numberOfMembers: number,
  category: string,
  status: string,
  owner: User,
  members: Array<User>
}