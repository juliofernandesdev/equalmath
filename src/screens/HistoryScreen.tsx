import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useCalculator } from '../contexts/CalculatorContext';

export const HistoryScreen: React.FC = () => {
  const { theme } = useTheme();
  const { history, clearHistory, useHistoryEntry } = useCalculator();

  const handleClearHistory = () => {
    Alert.alert(
      'Limpar Histórico',
      'Tem certeza que deseja apagar todo o histórico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: clearHistory },
      ]
    );
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Hoje, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Ontem, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return date.toLocaleDateString('pt-BR', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  };

  const getModeLabel = (mode: string): string => {
    const labels: Record<string, string> = {
      basic: 'Básica',
      scientific: 'Científica',
      programmer: 'Programador',
      converter: 'Conversor',
      financial: 'Financeira',
      date: 'Data',
    };
    return labels[mode] || mode;
  };

  if (history.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.background }]}>
        <Ionicons name="document-text-outline" size={64} color={theme.textTertiary} />
        <Text style={[styles.emptyTitle, { color: theme.text }]}>
          Histórico Vazio
        </Text>
        <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
          Os cálculos que você fizer aparecerão aqui
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Histórico
        </Text>
        <TouchableOpacity onPress={handleClearHistory}>
          <Text style={[styles.clearButton, { color: theme.danger }]}>
            Limpar
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {history.map((entry, index) => (
          <TouchableOpacity
            key={entry.id}
            style={[
              styles.historyItem,
              { backgroundColor: theme.surface },
              index === history.length - 1 && styles.lastItem,
            ]}
            onPress={() => useHistoryEntry(entry)}
            activeOpacity={0.7}
          >
            <View style={styles.historyHeader}>
              <Text style={[styles.historyMode, { color: theme.textTertiary }]}>
                {getModeLabel(entry.mode)}
              </Text>
              <Text style={[styles.historyDate, { color: theme.textTertiary }]}>
                {formatDate(entry.timestamp)}
              </Text>
            </View>
            
            <Text 
              style={[styles.historyExpression, { color: theme.textSecondary }]}
              numberOfLines={2}
            >
              {entry.expression}
            </Text>
            
            <Text 
              style={[styles.historyResult, { color: theme.text }]}
              numberOfLines={1}
            >
              = {entry.result}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: 16,
  },
  historyItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  lastItem: {
    marginBottom: 32,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyMode: {
    fontSize: 12,
    fontWeight: '500',
  },
  historyDate: {
    fontSize: 12,
  },
  historyExpression: {
    fontSize: 16,
    marginBottom: 4,
  },
  historyResult: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default HistoryScreen;
