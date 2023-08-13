import { round, toNumber } from "lodash";
import { ExpenseCateId } from "./category";
import { User } from "./user";

export interface Expense {
  id: number;
  group_id: number;
  amount: number;
  user: User;
  category: ExpenseCateId;
  title: string;
  date: Date;
  createdBy: User;
  participant: Array<User>;
}

export function getMoneyText(expense: Expense): string {
  return utilGetMoneyText(expense.amount, "VND");
}

export function utilGetMoneyText(money: number, currency: string): string {
  if (money < 0) {
    money = -money;
  }
  let text = utilGetNumberText(money) + " " + currency;
  return text;
}

export function utilGetNumberText(money: number): string {
  if (money < 0) {
    money = -money;
  }
  money = round(money);
  let text = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return text;
}

export function utilGetNumberFromText(text: string): number {
  let temp = text.replace(/,/gm, "");
  return toNumber(temp);
}

export function getDecriptionText(expense: Expense): string {
  let decr = expense.title + " - chi bởi " + expense.createdBy.name;
  return decr;
}
