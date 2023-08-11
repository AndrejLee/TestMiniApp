export interface Group {
  id: number
  money: number
  category: string
  title: string
  date: Date
  currency: string
  participant: Array<number>
}