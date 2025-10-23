import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

export const STORAGE_KEYS = {
  TRANSACTIONS: 'transactions',
  THEME_MODE: 'theme_mode',
} as const;

export const StorageUtils = {
  saveTransactions: (transactions: any[]) => {
    try {
      storage.set(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  },

  loadTransactions: (): any[] => {
    try {
      const data = storage.getString(STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  },
  saveThemeMode: (themeMode: string) => {
    try {
      storage.set(STORAGE_KEYS.THEME_MODE, themeMode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  },

  loadThemeMode: (): string => {
    try {
      return storage.getString(STORAGE_KEYS.THEME_MODE) || 'light';
    } catch (error) {
      console.error('Error loading theme mode:', error);
      return 'light';
    }
  },

  clearAll: () => {
    try {
      storage.remove(STORAGE_KEYS.TRANSACTIONS);
      storage.remove(STORAGE_KEYS.THEME_MODE);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
