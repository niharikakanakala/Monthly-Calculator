export type IncomeType = number;
export type ExpensesType = number;
export type BudgetType = number;
export type PercentageType = number;

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  value: number;
}

export interface TransactionItemProps extends Transaction {
  onDeleteClick: (id: Transaction['id']) => void;
}

export type TransactionListType = Transaction[];
