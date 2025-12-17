import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalcButton from './CalcButton';
import { useCalculator } from '../contexts/CalculatorContext';
import { useTheme } from '../contexts/ThemeContext';

export const BasicKeypad: React.FC = () => {
  const { theme } = useTheme();
  const {
    appendToDisplay,
    clearAll,
    clearDisplay,
    deleteLastChar,
    calculate,
    toggleSign,
    insertPercentage,
    display,
  } = useCalculator();

  const renderRow = (buttons: React.ReactNode[]) => (
    <View style={styles.row}>{buttons}</View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {renderRow([
        <CalcButton 
          key="clear" 
          label={display === '0' ? 'AC' : 'C'} 
          onPress={display === '0' ? clearAll : clearDisplay}
          onLongPress={clearAll}
          variant="action" 
        />,
        <CalcButton 
          key="sign" 
          label="±" 
          onPress={toggleSign} 
          variant="function" 
        />,
        <CalcButton 
          key="percent" 
          label="%" 
          onPress={insertPercentage} 
          variant="function" 
        />,
        <CalcButton 
          key="divide" 
          label="÷" 
          onPress={() => appendToDisplay('÷')} 
          variant="operator" 
        />,
      ])}

      {renderRow([
        <CalcButton key="7" label="7" onPress={() => appendToDisplay('7')} />,
        <CalcButton key="8" label="8" onPress={() => appendToDisplay('8')} />,
        <CalcButton key="9" label="9" onPress={() => appendToDisplay('9')} />,
        <CalcButton 
          key="multiply" 
          label="×" 
          onPress={() => appendToDisplay('×')} 
          variant="operator" 
        />,
      ])}

      {renderRow([
        <CalcButton key="4" label="4" onPress={() => appendToDisplay('4')} />,
        <CalcButton key="5" label="5" onPress={() => appendToDisplay('5')} />,
        <CalcButton key="6" label="6" onPress={() => appendToDisplay('6')} />,
        <CalcButton 
          key="subtract" 
          label="−" 
          onPress={() => appendToDisplay('-')} 
          variant="operator" 
        />,
      ])}

      {renderRow([
        <CalcButton key="1" label="1" onPress={() => appendToDisplay('1')} />,
        <CalcButton key="2" label="2" onPress={() => appendToDisplay('2')} />,
        <CalcButton key="3" label="3" onPress={() => appendToDisplay('3')} />,
        <CalcButton 
          key="add" 
          label="+" 
          onPress={() => appendToDisplay('+')} 
          variant="operator" 
        />,
      ])}

      {renderRow([
        <CalcButton 
          key="0" 
          label="0" 
          onPress={() => appendToDisplay('0')} 
          span={2}
        />,
        <CalcButton 
          key="decimal" 
          label="," 
          onPress={() => appendToDisplay('.')} 
        />,
        <CalcButton 
          key="equals" 
          label="=" 
          onPress={calculate} 
          variant="equal" 
        />,
      ])}

      {/* Backspace inline button */}
      <TouchableOpacity
        style={[styles.backspaceButton, { backgroundColor: theme.surface }]}
        onPress={deleteLastChar}
        onLongPress={clearAll}
        activeOpacity={0.7}
      >
        <Ionicons name="backspace-outline" size={24} color={theme.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backspaceButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 48,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BasicKeypad;
