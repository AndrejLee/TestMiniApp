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

export function mapStringToCategoryId(str: string): CategoryId | null {
  switch (str) {
    case 'coffee':
    case 'matcha':
    case 'food':
    case 'milktea':
    case 'drinks':
    case 'bread':
    case 'juice':
      return str as CategoryId;
    default:
      return null;
  }
}
