export interface Expense {
  id: number
  money: number
  category: string
  title: string
  date: Date
  currency: string
  byId: number
  byName: string
  participant: Array<number>
}

export function getMoneyText(expense: Expense) : string {
  let money = expense.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " " + expense.currency;
  return money;
}

export function getDecriptionText(expense: Expense) : string {
  let decr = expense.title + " - chi bởi " + expense.byName;
  return decr;
}