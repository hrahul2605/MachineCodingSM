import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { IBalanceSummary } from '../types';

interface IBalanceSummaryProps {
  balance: IBalanceSummary;
}

const BalanceSummary: React.FC<IBalanceSummaryProps> = ({ balance }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text
          variant="titleLarge"
          style={[styles.title, { color: theme.colors.primary }]}
        >
          Balance Summary
        </Text>

        <View style={styles.balanceRow}>
          <Text variant="bodyMedium" style={styles.label}>
            Total Balance:
          </Text>
          <Text
            variant="bodyMedium"
            style={[
              styles.amount,
              {
                color:
                  balance.totalBalance >= 0
                    ? theme.colors.primary
                    : theme.colors.error,
              },
            ]}
          >
            ₹{balance.totalBalance.toFixed(2)}
          </Text>
        </View>

        <View style={styles.balanceRow}>
          <Text variant="bodyMedium" style={styles.label}>
            Total Income:
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.amount, { color: theme.colors.primary }]}
          >
            ₹{balance.totalIncome.toFixed(2)}
          </Text>
        </View>

        <View style={styles.balanceRow}>
          <Text variant="bodyMedium" style={styles.label}>
            Total Expenses:
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.amount, { color: theme.colors.error }]}
          >
            ₹{balance.totalExpenses.toFixed(2)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BalanceSummary;
