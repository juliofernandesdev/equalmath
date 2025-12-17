import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import CalcButton from './CalcButton';
import { useCalculator } from '../contexts/CalculatorContext';
import { useTheme } from '../contexts/ThemeContext';

export const ScientificKeypad: React.FC = () => {
  const { theme } = useTheme();
  const {
    appendToDisplay,
    clearAll,
    clearDisplay,
    deleteLastChar,
    calculate,
    toggleSign,
    insertPercentage,
    applyFunction,
    insertConstant,
    display,
    angleUnit,
    setAngleUnit,
    isSecondFunction,
    toggleSecondFunction,
    isInverse,
    toggleInverse,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
    memory,
  } = useCalculator();

  const renderRow = (buttons: React.ReactNode[]) => (
    <View style={styles.row}>{buttons}</View>
  );

  const AngleUnitSelector = () => (
    <View style={styles.angleSelector}>
      {(['deg', 'rad', 'grad'] as const).map((unit) => (
        <TouchableOpacity
          key={unit}
          style={[
            styles.angleButton,
            angleUnit === unit && { backgroundColor: theme.accent },
          ]}
          onPress={() => setAngleUnit(unit)}
        >
          <Text
            style={[
              styles.angleText,
              { color: angleUnit === unit ? '#FFF' : theme.textSecondary },
            ]}
          >
            {unit.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Angle Unit Selector */}
      <AngleUnitSelector />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Memory Row */}
        {renderRow([
          <CalcButton key="mc" label="MC" onPress={memoryClear} variant="memory" size="small" />,
          <CalcButton key="mr" label="MR" onPress={() => memoryRecall()} variant="memory" size="small" disabled={memory[0] === 0} />,
          <CalcButton key="m+" label="M+" onPress={memoryAdd} variant="memory" size="small" />,
          <CalcButton key="m-" label="M−" onPress={memorySubtract} variant="memory" size="small" />,
          <CalcButton key="ms" label="MS" onPress={memoryStore} variant="memory" size="small" />,
        ])}

        {/* Function Toggle Row */}
        {renderRow([
          <CalcButton 
            key="2nd" 
            label="2nd" 
            onPress={toggleSecondFunction} 
            variant="function" 
            size="small"
            active={isSecondFunction}
          />,
          <CalcButton 
            key="inv" 
            label="INV" 
            onPress={toggleInverse} 
            variant="function" 
            size="small"
            active={isInverse}
          />,
          <CalcButton key="pi" label="π" onPress={() => insertConstant('pi')} variant="function" size="small" />,
          <CalcButton key="e" label="e" onPress={() => insertConstant('e')} variant="function" size="small" />,
          <CalcButton key="phi" label="φ" onPress={() => insertConstant('phi')} variant="function" size="small" />,
        ])}

        {/* Scientific Functions Row 1 */}
        {renderRow([
          <CalcButton 
            key="sin" 
            label={isInverse ? "sin⁻¹" : (isSecondFunction ? "sinh" : "sin")} 
            onPress={() => applyFunction(isSecondFunction ? 'sinh' : 'sin')} 
            variant="function" 
            size="small"
          />,
          <CalcButton 
            key="cos" 
            label={isInverse ? "cos⁻¹" : (isSecondFunction ? "cosh" : "cos")} 
            onPress={() => applyFunction(isSecondFunction ? 'cosh' : 'cos')} 
            variant="function" 
            size="small"
          />,
          <CalcButton 
            key="tan" 
            label={isInverse ? "tan⁻¹" : (isSecondFunction ? "tanh" : "tan")} 
            onPress={() => applyFunction(isSecondFunction ? 'tanh' : 'tan')} 
            variant="function" 
            size="small"
          />,
          <CalcButton 
            key="log" 
            label={isSecondFunction ? "10ˣ" : "log"} 
            onPress={() => applyFunction(isSecondFunction ? '10^x' : 'log')} 
            variant="function" 
            size="small"
          />,
          <CalcButton 
            key="ln" 
            label={isSecondFunction ? "eˣ" : "ln"} 
            onPress={() => applyFunction(isSecondFunction ? 'e^x' : 'ln')} 
            variant="function" 
            size="small"
          />,
        ])}

        {/* Scientific Functions Row 2 */}
        {renderRow([
          <CalcButton key="sqrt" label="√" onPress={() => applyFunction('sqrt')} variant="function" size="small" />,
          <CalcButton key="cbrt" label="∛" onPress={() => applyFunction('cbrt')} variant="function" size="small" />,
          <CalcButton key="square" label="x²" onPress={() => applyFunction('square')} variant="function" size="small" />,
          <CalcButton key="cube" label="x³" onPress={() => applyFunction('cube')} variant="function" size="small" />,
          <CalcButton key="power" label="xʸ" onPress={() => appendToDisplay('^')} variant="function" size="small" />,
        ])}

        {/* Scientific Functions Row 3 */}
        {renderRow([
          <CalcButton key="factorial" label="x!" onPress={() => applyFunction('factorial')} variant="function" size="small" />,
          <CalcButton key="inverse" label="1/x" onPress={() => applyFunction('inverse')} variant="function" size="small" />,
          <CalcButton key="abs" label="|x|" onPress={() => applyFunction('abs')} variant="function" size="small" />,
          <CalcButton key="exp" label="EXP" onPress={() => appendToDisplay('e')} variant="function" size="small" />,
          <CalcButton key="mod" label="mod" onPress={() => appendToDisplay('%')} variant="function" size="small" />,
        ])}

        {/* Parentheses and special */}
        {renderRow([
          <CalcButton key="(" label="(" onPress={() => appendToDisplay('(')} variant="function" size="small" />,
          <CalcButton key=")" label=")" onPress={() => appendToDisplay(')')} variant="function" size="small" />,
          <CalcButton key="floor" label="⌊x⌋" onPress={() => applyFunction('floor')} variant="function" size="small" />,
          <CalcButton key="ceil" label="⌈x⌉" onPress={() => applyFunction('ceil')} variant="function" size="small" />,
          <CalcButton key="round" label="rnd" onPress={() => applyFunction('round')} variant="function" size="small" />,
        ])}

        {/* Standard keypad */}
        {renderRow([
          <CalcButton 
            key="clear" 
            label={display === '0' ? 'AC' : 'C'} 
            onPress={display === '0' ? clearAll : clearDisplay}
            onLongPress={clearAll}
            variant="action" 
          />,
          <CalcButton key="sign" label="±" onPress={toggleSign} variant="function" />,
          <CalcButton key="percent" label="%" onPress={insertPercentage} variant="function" />,
          <CalcButton key="divide" label="÷" onPress={() => appendToDisplay('÷')} variant="operator" />,
          <CalcButton key="backspace" label="⌫" onPress={deleteLastChar} onLongPress={clearAll} variant="function" />,
        ])}

        {renderRow([
          <CalcButton key="7" label="7" onPress={() => appendToDisplay('7')} />,
          <CalcButton key="8" label="8" onPress={() => appendToDisplay('8')} />,
          <CalcButton key="9" label="9" onPress={() => appendToDisplay('9')} />,
          <CalcButton key="multiply" label="×" onPress={() => appendToDisplay('×')} variant="operator" />,
          <CalcButton key="log2" label="log₂" onPress={() => applyFunction('log2')} variant="function" size="small" />,
        ])}

        {renderRow([
          <CalcButton key="4" label="4" onPress={() => appendToDisplay('4')} />,
          <CalcButton key="5" label="5" onPress={() => appendToDisplay('5')} />,
          <CalcButton key="6" label="6" onPress={() => appendToDisplay('6')} />,
          <CalcButton key="subtract" label="−" onPress={() => appendToDisplay('-')} variant="operator" />,
          <CalcButton key="2x" label="2ˣ" onPress={() => applyFunction('2^x')} variant="function" size="small" />,
        ])}

        {renderRow([
          <CalcButton key="1" label="1" onPress={() => appendToDisplay('1')} />,
          <CalcButton key="2" label="2" onPress={() => appendToDisplay('2')} />,
          <CalcButton key="3" label="3" onPress={() => appendToDisplay('3')} />,
          <CalcButton key="add" label="+" onPress={() => appendToDisplay('+')} variant="operator" />,
          <CalcButton key="sqrt2" label="√2" onPress={() => insertConstant('sqrt2')} variant="function" size="small" />,
        ])}

        {renderRow([
          <CalcButton key="0" label="0" onPress={() => appendToDisplay('0')} span={2} />,
          <CalcButton key="decimal" label="," onPress={() => appendToDisplay('.')} />,
          <CalcButton key="equals" label="=" onPress={calculate} variant="equal" span={2} />,
        ])}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
  angleSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  angleButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  angleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    minHeight: 52,
  },
});

export default ScientificKeypad;
