import { useState, useMemo, useCallback, useEffect } from 'react';
import { ITransaction, IFilterOptions, IBalanceSummary } from '../types';
import { generateId } from '../utils';
import { StorageUtils } from '../utils/storage';

export const useExpenseTracker = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filters, setFilters] = useState<IFilterOptions>({});

  useEffect(() => {
    const savedTransactions = StorageUtils.loadTransactions();
    if (savedTransactions.length > 0) {
      setTransactions(savedTransactions);
    }
  }, [])

  useEffect(() => {
    StorageUtils.saveTransactions(transactions);
  }, [transactions]);


  const addTransaction = useCallback(
    (transactionData: Omit<ITransaction, 'id'>) => {
      const newTransaction: ITransaction = {
        ...transactionData,
        id: generateId(),
      };
      setTransactions(prev => [newTransaction, ...prev]);
    },
    [],
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }

      if (filters.category && transaction.category !== filters.category) {
        return false;
      }

      if (
        filters.minAmount !== undefined &&
        transaction.amount < filters.minAmount
      ) {
        return false;
      }
      if (
        filters.maxAmount !== undefined &&
        transaction.amount > filters.maxAmount
      ) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);

  const balanceSummary = useMemo((): IBalanceSummary => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
    };
  }, [transactions]);

  const categories: Array<string> = useMemo(() => {
    const categorySet = new Set(transactions.map(t => t.category));
    return Array.from(categorySet).sort();
  }, [transactions]);

  const updateFilters = useCallback((newFilters: IFilterOptions) => {
    setFilters(newFilters);
  }, []);

  const clearAllData = useCallback(() => {
    setTransactions([]);
    setFilters({});
    StorageUtils.clearAll();
  }, []);

  const deleteTransaction = useCallback((transactionId: string) => {
    setTransactions(prev => prev.filter(t => t.id !== transactionId));
  }, []);

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    balanceSummary,
    categories,
    addTransaction,
    updateFilters,
    clearAllData,
    deleteTransaction,
  };
};
