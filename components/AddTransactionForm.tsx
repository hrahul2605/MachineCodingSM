import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  TextInput,
  Button,
  SegmentedButtons,
  Menu,
  Portal,
  Modal,
  Text,
  Divider,
} from 'react-native-paper';
import { ITransaction } from '../types';

interface AddTransactionFormProps {
  onAddTransaction: (transaction: Omit<ITransaction, 'id'>) => void;
  visible: boolean;
  onDismiss: () => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  onAddTransaction,
  visible,
  onDismiss,
}) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense',
  });
  const [menuVisible, setMenuVisible] = useState(false);

  const categories = ['Food', 'Travel', 'Shopping', 'Other'];

  const handleSubmit = () => {
    if (!formData.amount || !formData.category) {
      return;
    }

    const transaction: Omit<ITransaction, 'id'> = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: new Date().toISOString(),
    };

    onAddTransaction(transaction);

    setFormData({
      amount: '',
      category: '',
      type: 'expense',
    });
    onDismiss();
  };

  const handleDismiss = () => {
    setFormData({
      amount: '',
      category: '',
      type: 'expense',
    });
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleDismiss}
        contentContainerStyle={styles.modal}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.title}>
              Add Transaction
            </Text>
            <Divider style={styles.divider} />

            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                label="Amount"
                value={formData.amount}
                onChangeText={(value) => setFormData({...formData, amount: value})}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
                placeholder="Enter amount"
                enterKeyHint="done"
                returnKeyType="done"
                returnKeyLabel="done"
              />

              <View style={styles.menuContainer}>
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setMenuVisible(true)}
                      style={styles.categoryButton}
                      contentStyle={styles.categoryButtonContent}
                    >
                      {formData.category || 'Select Category'}
                    </Button>
                  }
                >
                  {categories.map(cat => (
                    <Menu.Item
                      key={cat}
                      onPress={() => {
                        setFormData({...formData, category: cat});
                        setMenuVisible(false);
                      }}
                      title={cat}
                    />
                  ))}
                </Menu>
              </View>

              <SegmentedButtons
                value={formData.type}
                onValueChange={value => setFormData({...formData, type: value as 'income' | 'expense'})}
                buttons={[
                  { value: 'expense', label: 'Expense' },
                  { value: 'income', label: 'Income' },
                ]}
                style={styles.segmentedButtons}
              />


              <View style={styles.buttonContainer}>
                <Button
                  mode="outlined"
                  onPress={handleDismiss}
                  style={styles.button}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.button}
                  disabled={!formData.amount || !formData.category}
                >
                  Add Transaction
                </Button>
              </View>
            </ScrollView>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    maxHeight: '80%',
  },
  card: {
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
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
  segmentedButtons: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default AddTransactionForm;
