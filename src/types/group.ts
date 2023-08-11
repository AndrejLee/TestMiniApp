export interface Group {
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

export function getMoneyText(group: Group) : string {
  let money = group.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " " + group.currency;
  return money;
}

export function getDecriptionText(group: Group) : string {
  let decr = group.title + " - chi bởi " + group.byName;
  return decr;
}