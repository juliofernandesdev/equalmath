import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { dateDifference, addToDate } from '../utils/calculator';

type DateMode = 'difference' | 'add' | 'subtract';

export const DateScreen: React.FC = () => {
  const { theme } = useTheme();
  const [mode, setMode] = useState<DateMode>('difference');
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [addValue, setAddValue] = useState(1);
  const [addUnit, setAddUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days');

  const modes: { id: DateMode; label: string; icon: string }[] = [
    { id: 'difference', label: 'Diferença', icon: '📅' },
    { id: 'add', label: 'Adicionar', icon: '➕' },
    { id: 'subtract', label: 'Subtrair', icon: '➖' },
  ];

  const units: { id: 'days' | 'weeks' | 'months' | 'years'; label: string }[] = [
    { id: 'days', label: 'Dias' },
    { id: 'weeks', label: 'Semanas' },
    { id: 'months', label: 'Meses' },
    { id: 'years', label: 'Anos' },
  ];

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const adjustDate = (date: Date, field: 'day' | 'month' | 'year', delta: number): Date => {
    const newDate = new Date(date);
    switch (field) {
      case 'day':
        newDate.setDate(newDate.getDate() + delta);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + delta);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + delta);
        break;
    }
    return newDate;
  };

  const renderDatePicker = (
    date: Date,
    setDate: (date: Date) => void,
    label: string
  ) => (
    <View style={[styles.dateCard, { backgroundColor: theme.surface }]}>
      <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>{label}</Text>
      
      <View style={styles.dateControls}>
        {/* Day */}
        <View style={styles.dateColumn}>
          <TouchableOpacity
            style={[styles.arrowButton, { backgroundColor: theme.surfaceVariant }]}
            onPress={() => setDate(adjustDate(date, 'day', 1))}
          >
            <Text style={[styles.arrowText, { color: theme.text }]}>▲</Text>
          </TouchableOpacity>
          <Text style={[styles.dateValue, { color: theme.text }]}>
            {date.getDate().toString().padStart(2, '0')}
          </Text>
          <TouchableOpacity
            style={[styles.arrowButton, { backgroundColor: theme.surfaceVariant }]}
            onPress={() => setDate(adjustDate(date, 'day', -1))}
          >
            <Text style={[styles.arrowText, { color: theme.text }]}>▼</Text>
          </TouchableOpacity>
          <Text style={[styles.dateFieldLabel, { color: theme.textTertiary }]}>Dia</Text>
        </View>

        <Text style={[styles.dateSeparator, { color: theme.textSecondary }]}>/</Text>

        {/* Month */}
        <View style={styles.dateColumn}>
          <TouchableOpacity
            style={[styles.arrowButton, { backgroundColor: theme.surfaceVariant }]}
            onPress={() => setDate(adjustDate(date, 'month', 1))}
          >
            <Text style={[styles.arrowText, { color: theme.text }]}>▲</Text>
          </TouchableOpacity>
          <Text style={[styles.dateValue, { color: theme.text }]}>
            {(date.getMonth() + 1).toString().padStart(2, '0')}
          </Text>
          <TouchableOpacity
            style={[styles.arrowButton, { backgroundColor: theme.surfaceVariant }]}
            onPress={() => setDate(adjustDate(date, 'month', -1))}
          >
            <Text style={[styles.arrowText, { color: theme.text }]}>▼</Text>
          </TouchableOpacity>
          <Text style={[styles.dateFieldLabel, { color: theme.textTertiary }]}>Mês</Text>
        </View>

        <Text style={[styles.dateSeparator, { color: theme.textSecondary }]}>/</Text>

        {/* Year */}
        <View style={styles.dateColumn}>
          <TouchableOpacity
            style={[styles.arrowButton, { backgroundColor: theme.surfaceVariant }]}
            onPress={() => setDate(adjustDate(date, 'year', 1))}
          >
            <Text style={[styles.arrowText, { color: theme.text }]}>▲</Text>
          </TouchableOpacity>
          <Text style={[styles.dateValue, { color: theme.text }]}>
            {date.getFullYear()}
          </Text>
          <TouchableOpacity
            style={[styles.arrowButton, { backgroundColor: theme.surfaceVariant }]}
            onPress={() => setDate(adjustDate(date, 'year', -1))}
          >
            <Text style={[styles.arrowText, { color: theme.text }]}>▼</Text>
          </TouchableOpacity>
          <Text style={[styles.dateFieldLabel, { color: theme.textTertiary }]}>Ano</Text>
        </View>
      </View>

      <Text style={[styles.formattedDate, { color: theme.textSecondary }]}>
        {formatDate(date)}
      </Text>

      <TouchableOpacity
        style={[styles.todayButton, { backgroundColor: theme.accent }]}
        onPress={() => setDate(new Date())}
      >
        <Text style={styles.todayButtonText}>Hoje</Text>
      </TouchableOpacity>
    </View>
  );

  const renderValueSelector = () => (
    <View style={[styles.valueCard, { backgroundColor: theme.surface }]}>
      <Text style={[styles.dateLabel, { color: theme.textSecondary }]}>Valor</Text>
      
      <View style={styles.valueControls}>
        <TouchableOpacity
          style={[styles.valueButton, { backgroundColor: theme.surfaceVariant }]}
          onPress={() => setAddValue(Math.max(1, addValue - 1))}
        >
          <Text style={[styles.valueButtonText, { color: theme.text }]}>−</Text>
        </TouchableOpacity>
        
        <Text style={[styles.valueText, { color: theme.text }]}>{addValue}</Text>
        
        <TouchableOpacity
          style={[styles.valueButton, { backgroundColor: theme.surfaceVariant }]}
          onPress={() => setAddValue(addValue + 1)}
        >
          <Text style={[styles.valueButtonText, { color: theme.text }]}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.unitSelector}>
        {units.map((unit) => (
          <TouchableOpacity
            key={unit.id}
            style={[
              styles.unitButton,
              addUnit === unit.id && { backgroundColor: theme.accent },
            ]}
            onPress={() => setAddUnit(unit.id)}
          >
            <Text
              style={[
                styles.unitText,
                { color: addUnit === unit.id ? '#FFF' : theme.textSecondary },
              ]}
            >
              {unit.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDifferenceResult = () => {
    const diff = dateDifference(date1, date2);

    return (
      <View style={[styles.resultCard, { backgroundColor: theme.accent }]}>
        <Text style={styles.resultTitle}>Diferença</Text>
        <Text style={styles.resultValue}>{diff.days} dias</Text>
        
        <View style={styles.resultDetails}>
          <View style={styles.resultDetailItem}>
            <Text style={styles.resultDetailValue}>{diff.years}</Text>
            <Text style={styles.resultDetailLabel}>Anos</Text>
          </View>
          <View style={styles.resultDetailItem}>
            <Text style={styles.resultDetailValue}>{diff.months % 12}</Text>
            <Text style={styles.resultDetailLabel}>Meses</Text>
          </View>
          <View style={styles.resultDetailItem}>
            <Text style={styles.resultDetailValue}>{diff.weeks}</Text>
            <Text style={styles.resultDetailLabel}>Semanas</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAddSubtractResult = () => {
    const multiplier = mode === 'add' ? 1 : -1;
    const resultDate = addToDate(date1, addValue * multiplier, addUnit);

    return (
      <View style={[styles.resultCard, { backgroundColor: theme.accent }]}>
        <Text style={styles.resultTitle}>Resultado</Text>
        <Text style={styles.resultDateValue}>
          {resultDate.toLocaleDateString('pt-BR')}
        </Text>
        <Text style={styles.resultDateFull}>{formatDate(resultDate)}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Mode Selector */}
      <View style={styles.modeContainer}>
        {modes.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[
              styles.modeButton,
              mode === m.id && { backgroundColor: theme.accent },
            ]}
            onPress={() => setMode(m.id)}
          >
            <Text style={styles.modeIcon}>{m.icon}</Text>
            <Text
              style={[
                styles.modeText,
                { color: mode === m.id ? '#FFF' : theme.textSecondary },
              ]}
            >
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date 1 */}
        {renderDatePicker(
          date1, 
          setDate1, 
          mode === 'difference' ? 'Data Inicial' : 'Data'
        )}

        {/* Date 2 or Value Selector */}
        {mode === 'difference' ? (
          renderDatePicker(date2, setDate2, 'Data Final')
        ) : (
          renderValueSelector()
        )}

        {/* Result */}
        {mode === 'difference' ? renderDifferenceResult() : renderAddSubtractResult()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
  },
  modeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  dateCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  dateControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateColumn: {
    alignItems: 'center',
    gap: 8,
  },
  arrowButton: {
    width: 44,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
  },
  dateValue: {
    fontSize: 28,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'center',
  },
  dateFieldLabel: {
    fontSize: 12,
  },
  dateSeparator: {
    fontSize: 28,
    fontWeight: '300',
    marginHorizontal: 4,
  },
  formattedDate: {
    fontSize: 14,
    marginTop: 16,
    textTransform: 'capitalize',
  },
  todayButton: {
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  todayButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  valueCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  valueControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  valueButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueButtonText: {
    fontSize: 28,
    fontWeight: '300',
  },
  valueText: {
    fontSize: 48,
    fontWeight: '300',
    minWidth: 100,
    textAlign: 'center',
  },
  unitSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  unitButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resultCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  resultTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    opacity: 0.9,
  },
  resultValue: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultDateValue: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultDateFull: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.9,
    textTransform: 'capitalize',
  },
  resultDetails: {
    flexDirection: 'row',
    gap: 32,
  },
  resultDetailItem: {
    alignItems: 'center',
  },
  resultDetailValue: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
  },
  resultDetailLabel: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.8,
  },
});

export default DateScreen;
