import { isUndefined } from "lodash";
import { string } from "prop-types";

export type CategoryId =
  | "coffee"
  | "matcha"
  | "food"
  | "milktea"
  | "drinks"
  | "bread"
  | "juice";

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}

export type ExpenseCateId =
  | "OOD"
  | "ACCOMMODATION"
  | "TRANSPORTATION"
  | "SHOPPING"
  | "BEAUTY"
  | "SPORTS"
  | "ENTERTAINMENT"
  | "HEALTH"
  | "OTHER";

export interface ExpenseCate {
  id: ExpenseCateId;
  name: string;
  icon: string;
}

export const ExpenseCategories = {
  OOD: <ExpenseCate>{
    id: "OOD",
    name: "Ăn uống",
    icon: "https://img.icons8.com/bubbles/50/meal.png",
  },
  ACCOMMODATION: <ExpenseCate>{
    id: "ACCOMMODATION",
    name: "Nhà cửa",
    icon: "https://img.icons8.com/bubbles/50/home.png",
  },
  TRANSPORTATION: <ExpenseCate>{
    id: "TRANSPORTATION",
    name: "Di chuyển",
    icon: "https://img.icons8.com/bubbles/50/fiat-500.png",
  },
  SHOPPING: <ExpenseCate>{
    id: "SHOPPING",
    name: "Mua sắm",
    icon: "https://img.icons8.com/bubbles/50/shopping-cart-loaded.png",
  },
  BEAUTY: <ExpenseCate>{
    id: "BEAUTY",
    name: "Làm đẹp",
    icon: "https://img.icons8.com/bubbles/50/aroma.png",
  },
  SPORTS: <ExpenseCate>{
    id: "SPORTS",
    name: "Thể thao",
    icon: "https://img.icons8.com/bubbles/50/dumbbell.png",
  },
  ENTERTAINMENT: <ExpenseCate>{
    id: "ENTERTAINMENT",
    name: "Giải trí",
    icon: "https://img.icons8.com/bubbles/50/popcorn-time.png",
  },
  HEALTH: <ExpenseCate>{
    id: "HEALTH",
    name: "Sức khỏe",
    icon: "https://img.icons8.com/bubbles/50/trust.png",
  },
  OTHER: <ExpenseCate>{
    id: "OTHER",
    name: "Khác",
    icon: "https://img.icons8.com/bubbles/50/create-new.png",
  },
};

export function getExpenseIcon(cateId: ExpenseCateId) {
  if (isUndefined(cateId)) return ExpenseCategories.OTHER.icon;
  let temp = ExpenseCategories[cateId].icon;
  return temp ?? ExpenseCategories.OTHER.icon;
}

export type GroupCateId = "HOME" | "TRIP" | "COUPLE" | "OTHER";

export function isGroupCateId(value: string): value is GroupCateId {
  return value === "HOME" || value === "TRIP" || value === "COUPLE" || value === "OTHER";
}

export interface GroupCate {
  id: GroupCateId;
  name: string;
  icon: string;
}

export const GroupCategories = {
  HOME: <GroupCate>{
    id: "HOME",
    name: "Nhà chung",
    icon: "https://img.icons8.com/bubbles/50/cottage.png",
  },
  TRIP: <GroupCate>{
    id: "TRIP",
    name: "Du lịch",
    icon: "https://img.icons8.com/bubbles/50/passenger-with-baggage.png",
  },
  COUPLE: <GroupCate>{
    id: "COUPLE",
    name: "Cặp đôi",
    icon: "https://img.icons8.com/bubbles/50/novel.png",
  },
  OTHER: <GroupCate>{
    id: "OTHER",
    name: "Khác",
    icon: "https://img.icons8.com/bubbles/50/more.png",
  },
};

export function getGroupIcon(cateId: GroupCateId) {
  if (isUndefined(cateId)) return GroupCategories.OTHER.icon;
  let temp = GroupCategories[cateId].icon;
  return temp ?? GroupCategories.OTHER.icon;
}
