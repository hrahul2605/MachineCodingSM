import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import {
  Provider as PaperProvider,
  Appbar,
  FAB,
  IconButton,
} from 'react-native-paper';
import { useExpenseTracker } from './hooks/useExpenseTracker';
import BalanceSummary from './components/BalanceSummary';
import TransactionList from './components/TransactionList';
import AddTransactionForm from './components/AddTransactionForm';
import FilterBar from './components/FilterBar';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const SCREEN_HEIGHT = Dimensions.get('window').height;

function AppContent() {
  const { theme } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    transactions,
    balanceSummary,
    categories,
    addTransaction,
    updateFilters,
    clearAllData,
  } = useExpenseTracker();

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <StatusBar
            barStyle={theme.dark ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.surface}
          />

          <Appbar.Header>
            <Appbar.Content title="Expense Tracker" />
            <IconButton
              icon="delete-sweep"
              iconColor={theme.colors.onSurface}
              size={24}
              onPress={clearAllData}
              style={styles.clearButton}
            />
            <ThemeToggle />
          </Appbar.Header>

          <View style={styles.content}>
            <BalanceSummary balance={balanceSummary} />

            <FilterBar onFilterChange={updateFilters} categories={categories} />

            <TransactionList transactions={transactions} />
          </View>

          <AddTransactionForm
            visible={showAddForm}
            onDismiss={() => setShowAddForm(false)}
            onAddTransaction={addTransaction}
          />
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => setShowAddForm(true)}
          />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
  },
  clearButton: {
    marginRight: 4,
  },
  scrollView: {
    height: SCREEN_HEIGHT,
  },
});

export default App;
