import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import TransactionItem from './TransactionItem';
import { ITransaction } from '../types';

interface TransactionListProps {
  transactions: ITransaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const theme = useTheme();

  const renderTransaction = ({ item }: { item: ITransaction }) => (
    <TransactionItem transaction={item} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text
        style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}
      >
        No transactions found
      </Text>
      <Text
        style={[styles.emptySubtext, { color: theme.colors.onSurfaceVariant }]}
      >
        Add your first transaction to get started
      </Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderTransaction}
      keyExtractor={item => item.id}
      style={styles.list}
      contentContainerStyle={
        transactions.length === 0 ? styles.emptyList : styles.listContent
      }
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyState}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default TransactionList;
