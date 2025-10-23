export interface ITransaction {
  id: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
}

export interface IFilterOptions {
  type?: 'income' | 'expense' | 'all';
  category?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface IBalanceSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}
