import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, useTheme } from 'react-native-paper';
import { ITransaction } from '../types';
import { formatDate, getCategoryIcon } from '../utils';

interface ITransactionItemProps {
  transaction: ITransaction;
}

const TransactionItem: React.FC<ITransactionItemProps> = ({ transaction }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Text variant="titleLarge" style={styles.categoryIcon}>
              {getCategoryIcon(transaction.category)}
            </Text>
            <View style={styles.categoryInfo}>
              <Text variant="bodyMedium" style={styles.category}>
                {transaction.category}
              </Text>
              <Text variant="bodyMedium" style={styles.date}>
                {formatDate(transaction.date)}
              </Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <Chip
              mode="outlined"
              style={[
                styles.typeChip,
                {
                  backgroundColor:
                    transaction.type === 'income'
                      ? theme.colors.primaryContainer
                      : theme.colors.errorContainer,
                },
              ]}
              textStyle={[
                styles.typeText,
                {
                  color:
                    transaction.type === 'income'
                      ? theme.colors.primary
                      : theme.colors.error,
                },
              ]}
            >
              {transaction.type === 'income' ? 'Income' : 'Expense'}
            </Chip>
            <Text
              variant="titleLarge"
              style={[
                styles.amount,
                {
                  color:
                    transaction.type === 'income'
                      ? theme.colors.primary
                      : theme.colors.error,
                },
              ]}
            >
              {transaction.type === 'income' ? '+' : '-'}₹
              {transaction.amount.toFixed(2)}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  typeChip: {
    marginBottom: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.8,
    fontStyle: 'italic',
  },
});

export default TransactionItem;
