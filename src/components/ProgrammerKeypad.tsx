import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CalcButton from './CalcButton';
import { useCalculator } from '../contexts/CalculatorContext';
import { useTheme } from '../contexts/ThemeContext';
import { NumberBase } from '../types';

export const ProgrammerKeypad: React.FC = () => {
  const { theme } = useTheme();
  const {
    appendToDisplay,
    clearAll,
    clearDisplay,
    deleteLastChar,
    calculate,
    display,
    programmerBase,
    setProgrammerBase,
    programmerBitSize,
    setProgrammerBitSize,
  } = useCalculator();

  const bases: { label: string; value: NumberBase }[] = [
    { label: 'HEX', value: 'HEX' },
    { label: 'DEC', value: 'DEC' },
    { label: 'OCT', value: 'OCT' },
    { label: 'BIN', value: 'BIN' },
  ];

  const bitSizes: (8 | 16 | 32 | 64)[] = [8, 16, 32, 64];

  const isValidForBase = (char: string): boolean => {
    switch (programmerBase) {
      case 'BIN':
        return ['0', '1'].includes(char);
      case 'OCT':
        return ['0', '1', '2', '3', '4', '5', '6', '7'].includes(char);
      case 'DEC':
        return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char);
      case 'HEX':
        return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'].includes(char.toUpperCase());
      default:
        return true;
    }
  };

  const handleAppend = (value: string) => {
    if (isValidForBase(value)) {
      appendToDisplay(value.toUpperCase());
    }
  };

  const renderRow = (buttons: React.ReactNode[]) => (
    <View style={styles.row}>{buttons}</View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Base Selector */}
      <View style={styles.baseSelector}>
        {bases.map((base) => (
          <TouchableOpacity
            key={base.value}
            style={[
              styles.baseButton,
              programmerBase === base.value && { backgroundColor: theme.accent },
            ]}
            onPress={() => setProgrammerBase(base.value)}
          >
            <Text
              style={[
                styles.baseText,
                { color: programmerBase === base.value ? '#FFF' : theme.textSecondary },
              ]}
            >
              {base.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bit Size Selector */}
      <View style={styles.bitSelector}>
        {bitSizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.bitButton,
              programmerBitSize === size && { backgroundColor: theme.accent },
            ]}
            onPress={() => setProgrammerBitSize(size)}
          >
            <Text
              style={[
                styles.bitText,
                { color: programmerBitSize === size ? '#FFF' : theme.textSecondary },
              ]}
            >
              {size}bit
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hex Keys */}
      {programmerBase === 'HEX' && renderRow([
        <CalcButton key="A" label="A" onPress={() => handleAppend('A')} variant="function" />,
        <CalcButton key="B" label="B" onPress={() => handleAppend('B')} variant="function" />,
        <CalcButton key="C" label="C" onPress={() => handleAppend('C')} variant="function" />,
        <CalcButton key="D" label="D" onPress={() => handleAppend('D')} variant="function" />,
        <CalcButton key="E" label="E" onPress={() => handleAppend('E')} variant="function" />,
        <CalcButton key="F" label="F" onPress={() => handleAppend('F')} variant="function" />,
      ])}

      {/* Bitwise Operations */}
      {renderRow([
        <CalcButton key="and" label="AND" onPress={() => appendToDisplay('&')} variant="function" size="small" />,
        <CalcButton key="or" label="OR" onPress={() => appendToDisplay('|')} variant="function" size="small" />,
        <CalcButton key="xor" label="XOR" onPress={() => appendToDisplay('^')} variant="function" size="small" />,
        <CalcButton key="not" label="NOT" onPress={() => appendToDisplay('~')} variant="function" size="small" />,
      ])}

      {renderRow([
        <CalcButton key="lsh" label="LSH" onPress={() => appendToDisplay('<<')} variant="function" size="small" />,
        <CalcButton key="rsh" label="RSH" onPress={() => appendToDisplay('>>')} variant="function" size="small" />,
        <CalcButton key="rol" label="ROL" onPress={() => {}} variant="function" size="small" disabled />,
        <CalcButton key="ror" label="ROR" onPress={() => {}} variant="function" size="small" disabled />,
      ])}

      {/* Standard keypad */}
      {renderRow([
        <CalcButton 
          key="clear" 
          label={display === '0' ? 'AC' : 'C'} 
          onPress={display === '0' ? clearAll : clearDisplay}
          variant="action" 
        />,
        <CalcButton key="backspace" label="⌫" onPress={deleteLastChar} variant="function" />,
        <CalcButton key="divide" label="÷" onPress={() => appendToDisplay('÷')} variant="operator" />,
        <CalcButton key="multiply" label="×" onPress={() => appendToDisplay('×')} variant="operator" />,
      ])}

      {renderRow([
        <CalcButton key="7" label="7" onPress={() => handleAppend('7')} disabled={!isValidForBase('7')} />,
        <CalcButton key="8" label="8" onPress={() => handleAppend('8')} disabled={!isValidForBase('8')} />,
        <CalcButton key="9" label="9" onPress={() => handleAppend('9')} disabled={!isValidForBase('9')} />,
        <CalcButton key="subtract" label="−" onPress={() => appendToDisplay('-')} variant="operator" />,
      ])}

      {renderRow([
        <CalcButton key="4" label="4" onPress={() => handleAppend('4')} disabled={!isValidForBase('4')} />,
        <CalcButton key="5" label="5" onPress={() => handleAppend('5')} disabled={!isValidForBase('5')} />,
        <CalcButton key="6" label="6" onPress={() => handleAppend('6')} disabled={!isValidForBase('6')} />,
        <CalcButton key="add" label="+" onPress={() => appendToDisplay('+')} variant="operator" />,
      ])}

      {renderRow([
        <CalcButton key="1" label="1" onPress={() => handleAppend('1')} disabled={!isValidForBase('1')} />,
        <CalcButton key="2" label="2" onPress={() => handleAppend('2')} disabled={!isValidForBase('2')} />,
        <CalcButton key="3" label="3" onPress={() => handleAppend('3')} disabled={!isValidForBase('3')} />,
        <CalcButton key="equals" label="=" onPress={calculate} variant="equal" />,
      ])}

      {renderRow([
        <CalcButton key="0" label="0" onPress={() => handleAppend('0')} span={3} />,
        <CalcButton key="mod" label="MOD" onPress={() => appendToDisplay('%')} variant="operator" />,
      ])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  baseSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  baseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  baseText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bitSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  bitButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
  },
  bitText: {
    fontSize: 12,
    fontWeight: '500',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProgrammerKeypad;
