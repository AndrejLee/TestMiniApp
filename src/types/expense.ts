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
  return utilGetMoneyText(expense.money, expense.currency)
}

export function utilGetMoneyText(money: number, currency: string) : string {
  if (money < 0) {
    money = -money
  }
  let text = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " " + currency
  return text
}

export function getDecriptionText(expense: Expense) : string {
  let decr = expense.title + " - chi bởi " + expense.byName
  return decr
}