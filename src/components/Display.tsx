import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useCalculator } from '../contexts/CalculatorContext';

const { width } = Dimensions.get('window');

export const Display: React.FC = () => {
  const { theme, isDark } = useTheme();
  const { display, expression, memory, hasError, mode, programmerBase } = useCalculator();
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [display]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [display]);

  const getFontSize = () => {
    const length = display.length;
    if (length <= 8) return 56;
    if (length <= 12) return 44;
    if (length <= 16) return 36;
    if (length <= 20) return 28;
    return 22;
  };

  const renderProgrammerValues = () => {
    if (mode !== 'programmer') return null;

    const decValue = parseInt(display, 
      programmerBase === 'BIN' ? 2 : 
      programmerBase === 'OCT' ? 8 : 
      programmerBase === 'HEX' ? 16 : 10
    ) || 0;

    const values = [
      { label: 'HEX', value: decValue.toString(16).toUpperCase(), active: programmerBase === 'HEX' },
      { label: 'DEC', value: decValue.toString(10), active: programmerBase === 'DEC' },
      { label: 'OCT', value: decValue.toString(8), active: programmerBase === 'OCT' },
      { label: 'BIN', value: decValue.toString(2), active: programmerBase === 'BIN' },
    ];

    return (
      <View style={styles.programmerContainer}>
        {values.map((item) => (
          <View key={item.label} style={styles.programmerRow}>
            <Text style={[
              styles.programmerLabel, 
              { color: item.active ? theme.accent : theme.textTertiary }
            ]}>
              {item.label}
            </Text>
            <Text 
              style={[
                styles.programmerValue, 
                { color: item.active ? theme.text : theme.textSecondary }
              ]}
              numberOfLines={1}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Memory Indicator */}
      {memory[0] !== 0 && (
        <View style={styles.memoryIndicator}>
          <Text style={[styles.memoryText, { color: theme.accent }]}>M</Text>
        </View>
      )}

      {/* Expression */}
      {expression !== '' && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.expressionContainer}
          contentContainerStyle={styles.expressionContent}
        >
          <Text style={[styles.expression, { color: theme.textSecondary }]}>
            {expression}
          </Text>
        </ScrollView>
      )}

      {/* Programmer Mode Values */}
      {renderProgrammerValues()}

      {/* Main Display */}
      <Animated.View style={[styles.displayContainer, { opacity: fadeAnim }]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.displayContent}
        >
          <Text 
            style={[
              styles.display, 
              { 
                color: hasError ? theme.danger : theme.text,
                fontSize: getFontSize(),
              }
            ]}
            selectable
          >
            {display}
          </Text>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    minHeight: 160,
    justifyContent: 'flex-end',
  },
  memoryIndicator: {
    position: 'absolute',
    top: 10,
    left: 20,
    backgroundColor: 'rgba(0, 102, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  memoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  expressionContainer: {
    maxHeight: 30,
    marginBottom: 4,
  },
  expressionContent: {
    alignItems: 'flex-end',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  expression: {
    fontSize: 18,
    fontWeight: '400',
  },
  programmerContainer: {
    marginBottom: 10,
  },
  programmerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  programmerLabel: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
  },
  programmerValue: {
    fontSize: 14,
    fontFamily: 'monospace',
    flex: 1,
  },
  displayContainer: {
    alignItems: 'flex-end',
  },
  displayContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  display: {
    fontWeight: '300',
    textAlign: 'right',
  },
});

export default Display;
