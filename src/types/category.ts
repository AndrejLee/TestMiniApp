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
    icon: "https://img.icons8.com/ios/50/food.png",
  },
  ACCOMMODATION: <ExpenseCate>{
    id: "ACCOMMODATION",
    name: "Nhà cửa",
    icon: "https://img.icons8.com/ios/50/residence.png",
  },
  TRANSPORTATION: <ExpenseCate>{
    id: "TRANSPORTATION",
    name: "Di chuyển",
    icon: "https://img.icons8.com/ios/50/airport-transfer.png",
  },
  SHOPPING: <ExpenseCate>{
    id: "SHOPPING",
    name: "Mua sắm",
    icon: "https://img.icons8.com/ios/50/shopping-basket.png",
  },
  BEAUTY: <ExpenseCate>{
    id: "BEAUTY",
    name: "Làm đẹp",
    icon: "https://img.icons8.com/ios/50/eye-shadows--v2.png",
  },
  SPORTS: <ExpenseCate>{
    id: "SPORTS",
    name: "Thể thao",
    icon: "https://img.icons8.com/ios/50/pass-the-baton.png",
  },
  ENTERTAINMENT: <ExpenseCate>{
    id: "ENTERTAINMENT",
    name: "Giải trí",
    icon: "https://img.icons8.com/ios/50/theatre-mask.png",
  },
  HEALTH: <ExpenseCate>{
    id: "HEALTH",
    name: "Sức khỏe",
    icon: "https://img.icons8.com/ios/50/trust--v1.png",
  },
  OTHER: <ExpenseCate>{
    id: "OTHER",
    name: "Khác",
    icon: "https://img.icons8.com/ios/50/connection-status-off.png",
  },
};

export function getExpenseIcon(cateId: ExpenseCateId) {
  if (isUndefined(cateId)) return ExpenseCategories.OTHER.icon;
  let temp = ExpenseCategories[cateId].icon;
  return temp ?? ExpenseCategories.OTHER.icon;
}

export type GroupCateId = "HOME" | "TRIP" | "COUPLE" | "OTHER";

export interface GroupCate {
  id: GroupCateId;
  name: string;
  icon: string;
}

export const GroupCategories = {
  HOME: <GroupCate>{
    id: "HOME",
    name: "Nhà chung",
    icon: "https://img.icons8.com/ios/50/home--v1.png",
  },
  TRIP: <GroupCate>{
    id: "TRIP",
    name: "Du lịch",
    icon: "https://img.icons8.com/ios/50/residence.png",
  },
  COUPLE: <GroupCate>{
    id: "COUPLE",
    name: "Cặp đôi",
    icon: "https://img.icons8.com/ios/50/airport-transfer.png",
  },
  OTHER: <GroupCate>{
    id: "OTHER",
    name: "Khác",
    icon: "https://img.icons8.com/ios/50/connection-status-off.png",
  },
};
