import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import {
  Card,
  SegmentedButtons,
  Menu,
  Button,
  TextInput,
  Text,
  Divider,
} from 'react-native-paper';
import { IFilterOptions } from '../types';

interface FilterBarProps {
  onFilterChange: (filters: IFilterOptions) => void;
  categories: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  categories,
}) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>(
    'all',
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = () => {
    const filters: IFilterOptions = {
      type: typeFilter === 'all' ? undefined : typeFilter,
      category: categoryFilter || undefined,
      minAmount: minAmount ? parseFloat(minAmount) : undefined,
      maxAmount: maxAmount ? parseFloat(maxAmount) : undefined,
    };
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setTypeFilter('all');
    setCategoryFilter('');
    setMinAmount('');
    setMaxAmount('');
    onFilterChange({});
  };

  useEffect(() => {
    handleFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, categoryFilter, minAmount, maxAmount]);

  const onTypeFilterChange = (value: 'all' | 'income' | 'expense') => {
    setTypeFilter(value);
  };

  const onMenuDismiss = () => {
    setCategoryMenuVisible(false);
  };

  const onMenuOpen = () => {
    setCategoryMenuVisible(true);
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="titleLarge" style={styles.title}>
              Filters
            </Text>
            <Button
              mode="text"
              onPress={() => setIsExpanded(!isExpanded)}
              compact
            >
              {isExpanded ? 'Less' : 'More'}
            </Button>
          </View>

          <SegmentedButtons
            value={typeFilter}
            onValueChange={onTypeFilterChange}
            buttons={[
              { value: 'all', label: 'All' },
              { value: 'expense', label: 'Expense' },
              { value: 'income', label: 'Income' },
            ]}
            style={styles.segmentedButtons}
          />

          {isExpanded && (
            <>
              <Divider style={styles.divider} />

              <View style={styles.menuContainer}>
                <Menu
                  visible={categoryMenuVisible}
                  onDismiss={onMenuDismiss}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={onMenuOpen}
                      style={styles.categoryButton}
                      contentStyle={styles.categoryButtonContent}
                    >
                      {categoryFilter || 'All Categories'}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setCategoryFilter('');
                      setCategoryMenuVisible(false);
                    }}
                    title="All Categories"
                  />
                  {categories.map(category => (
                    <Menu.Item
                      key={category}
                      onPress={() => {
                        setCategoryFilter(category);
                        setCategoryMenuVisible(false);
                      }}
                      title={category}
                    />
                  ))}
                </Menu>
              </View>

              <View style={styles.amountContainer}>
                <TextInput
                  label="Min Amount"
                  value={minAmount}
                  onChangeText={setMinAmount}
                  keyboardType="numeric"
                  mode="outlined"
                  style={styles.amountInput}
                  placeholder="0"
                  enterKeyHint="done"
                  returnKeyType="done"
                />
                <TextInput
                  label="Max Amount"
                  value={maxAmount}
                  onChangeText={setMaxAmount}
                  keyboardType="numeric"
                  mode="outlined"
                  style={styles.amountInput}
                  placeholder="∞"
                  enterKeyHint="done"
                  returnKeyType="done"
                />
              </View>

              <Button
                mode="outlined"
                onPress={clearFilters}
                style={styles.clearButton}
                icon="close"
              >
                Clear Filters
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  menuContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    justifyContent: 'flex-start',
  },
  categoryButtonContent: {
    justifyContent: 'flex-start',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  clearButton: {
    marginTop: 8,
  },
});

export default FilterBar;
