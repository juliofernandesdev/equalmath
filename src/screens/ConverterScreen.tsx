import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { conversionCategories, convert } from '../utils/conversions';

type IoniconsName = keyof typeof Ionicons.glyphMap;

const categoryIcons: Record<string, IoniconsName> = {
  length: 'resize-outline',
  mass: 'scale-outline',
  temperature: 'thermometer-outline',
  volume: 'cube-outline',
  area: 'square-outline',
  speed: 'speedometer-outline',
  time: 'time-outline',
  data: 'server-outline',
  energy: 'flash-outline',
  pressure: 'compass-outline',
  angle: 'analytics-outline',
  frequency: 'pulse-outline',
};

export const ConverterScreen: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(conversionCategories[0]);
  const [fromUnit, setFromUnit] = useState(selectedCategory.units[0]);
  const [toUnit, setToUnit] = useState(selectedCategory.units[1]);
  const [inputValue, setInputValue] = useState('1');

  const handleCategoryChange = (category: typeof conversionCategories[0]) => {
    setSelectedCategory(category);
    setFromUnit(category.units[0]);
    setToUnit(category.units[1]);
    setInputValue('1');
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const result = convert(
    parseFloat(inputValue) || 0,
    fromUnit.id,
    toUnit.id,
    selectedCategory.id
  );

  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.000001 || Math.abs(num) > 999999999) {
      return num.toExponential(6);
    }
    return num.toLocaleString('pt-BR', { maximumFractionDigits: 8 });
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Category Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {conversionCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory.id === category.id && { backgroundColor: theme.accent },
            ]}
            onPress={() => handleCategoryChange(category)}
          >
            <Ionicons 
              name={categoryIcons[category.id] || 'help-circle-outline'} 
              size={18} 
              color={selectedCategory.id === category.id ? '#FFF' : theme.textSecondary} 
            />
            <Text
              style={[
                styles.categoryText,
                { color: selectedCategory.id === category.id ? '#FFF' : theme.textSecondary },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* From Unit */}
        <View style={[styles.unitCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.unitLabel, { color: theme.textSecondary }]}>De</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.unitSelector}
          >
            {selectedCategory.units.map((unit) => (
              <TouchableOpacity
                key={unit.id}
                style={[
                  styles.unitButton,
                  fromUnit.id === unit.id && { backgroundColor: theme.accent },
                ]}
                onPress={() => setFromUnit(unit)}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    { color: fromUnit.id === unit.id ? '#FFF' : theme.text },
                  ]}
                >
                  {unit.symbol}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
          <Text style={[styles.unitName, { color: theme.textSecondary }]}>
            {fromUnit.name}
          </Text>
        </View>

        {/* Swap Button */}
        <TouchableOpacity style={[styles.swapButton, { backgroundColor: theme.accent }]} onPress={swapUnits}>
          <Ionicons name="swap-vertical" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* To Unit */}
        <View style={[styles.unitCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.unitLabel, { color: theme.textSecondary }]}>Para</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.unitSelector}
          >
            {selectedCategory.units.map((unit) => (
              <TouchableOpacity
                key={unit.id}
                style={[
                  styles.unitButton,
                  toUnit.id === unit.id && { backgroundColor: theme.accent },
                ]}
                onPress={() => setToUnit(unit)}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    { color: toUnit.id === unit.id ? '#FFF' : theme.text },
                  ]}
                >
                  {unit.symbol}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={[styles.resultValue, { color: theme.text }]}>
            {formatResult(result)}
          </Text>
          <Text style={[styles.unitName, { color: theme.textSecondary }]}>
            {toUnit.name}
          </Text>
        </View>

        {/* Quick Conversions */}
        <View style={[styles.quickSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.quickTitle, { color: theme.text }]}>
            Conversões Rápidas
          </Text>
          {selectedCategory.units.slice(0, 6).map((unit) => {
            if (unit.id === fromUnit.id) return null;
            const quickResult = convert(
              parseFloat(inputValue) || 0,
              fromUnit.id,
              unit.id,
              selectedCategory.id
            );
            return (
              <View key={unit.id} style={styles.quickRow}>
                <Text style={[styles.quickLabel, { color: theme.textSecondary }]}>
                  {unit.name}
                </Text>
                <Text style={[styles.quickValue, { color: theme.text }]}>
                  {formatResult(quickResult)} {unit.symbol}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    maxHeight: 70,
    paddingVertical: 10,
  },
  categoryContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
    marginRight: 8,
    gap: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  unitCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  unitLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  unitSelector: {
    marginBottom: 16,
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
    marginRight: 8,
  },
  unitButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    fontSize: 32,
    fontWeight: '300',
    borderBottomWidth: 2,
    paddingVertical: 8,
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 8,
  },
  unitName: {
    fontSize: 14,
  },
  swapButton: {
    alignSelf: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  quickSection: {
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  quickLabel: {
    fontSize: 14,
  },
  quickValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ConverterScreen;
