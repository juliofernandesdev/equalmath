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
import { 
  calculateLoan, 
  calculateCompoundInterest, 
  calculateTip, 
  calculateDiscount,
  calculateMargin,
} from '../utils/calculator';

type FinancialMode = 'loan' | 'compound' | 'tip' | 'discount' | 'margin';

export const FinancialScreen: React.FC = () => {
  const { theme } = useTheme();
  const [mode, setMode] = useState<FinancialMode>('loan');

  // Loan state
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('12');
  const [months, setMonths] = useState('24');

  // Compound interest state
  const [compoundPrincipal, setCompoundPrincipal] = useState('1000');
  const [compoundRate, setCompoundRate] = useState('10');
  const [years, setYears] = useState('5');
  const [compoundingFreq, setCompoundingFreq] = useState('12');

  // Tip state
  const [billAmount, setBillAmount] = useState('100');
  const [tipPercent, setTipPercent] = useState('15');
  const [splitCount, setSplitCount] = useState('1');

  // Discount state
  const [originalPrice, setOriginalPrice] = useState('100');
  const [discountPercent, setDiscountPercent] = useState('20');

  // Margin state
  const [cost, setCost] = useState('50');
  const [sellingPrice, setSellingPrice] = useState('100');

  type IoniconsName = keyof typeof Ionicons.glyphMap;
  const modes: { id: FinancialMode; label: string; icon: IoniconsName }[] = [
    { id: 'loan', label: 'Empréstimo', icon: 'business-outline' },
    { id: 'compound', label: 'Juros Compostos', icon: 'trending-up-outline' },
    { id: 'tip', label: 'Gorjeta', icon: 'restaurant-outline' },
    { id: 'discount', label: 'Desconto', icon: 'pricetag-outline' },
    { id: 'margin', label: 'Margem', icon: 'briefcase-outline' },
  ];

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatPercent = (value: number): string => {
    return value.toFixed(2) + '%';
  };

  const renderLoanCalculator = () => {
    const result = calculateLoan(
      parseFloat(principal) || 0,
      parseFloat(rate) || 0,
      parseInt(months) || 1
    );

    return (
      <View>
        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Valor do Empréstimo
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={principal}
            onChangeText={setPrincipal}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Taxa de Juros Anual (%)
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={rate}
            onChangeText={setRate}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Prazo (meses)
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={months}
            onChangeText={setMonths}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.resultCard, { backgroundColor: theme.accent }]}>
          <Text style={styles.resultTitle}>Parcela Mensal</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.monthlyPayment)}</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Total a Pagar
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              {formatCurrency(result.totalPayment)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Total de Juros
            </Text>
            <Text style={[styles.summaryValue, { color: theme.danger }]}>
              {formatCurrency(result.totalInterest)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCompoundCalculator = () => {
    const result = calculateCompoundInterest(
      parseFloat(compoundPrincipal) || 0,
      parseFloat(compoundRate) || 0,
      parseFloat(years) || 0,
      parseInt(compoundingFreq) || 12
    );

    return (
      <View>
        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Capital Inicial
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={compoundPrincipal}
            onChangeText={setCompoundPrincipal}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Taxa Anual (%)
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={compoundRate}
            onChangeText={setCompoundRate}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Período (anos)
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={years}
            onChangeText={setYears}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Capitalização por Ano
          </Text>
          <View style={styles.frequencySelector}>
            {[
              { value: '1', label: 'Anual' },
              { value: '4', label: 'Trimestral' },
              { value: '12', label: 'Mensal' },
              { value: '365', label: 'Diária' },
            ].map((freq) => (
              <TouchableOpacity
                key={freq.value}
                style={[
                  styles.frequencyButton,
                  compoundingFreq === freq.value && { backgroundColor: theme.accent },
                ]}
                onPress={() => setCompoundingFreq(freq.value)}
              >
                <Text
                  style={[
                    styles.frequencyText,
                    { color: compoundingFreq === freq.value ? '#FFF' : theme.textSecondary },
                  ]}
                >
                  {freq.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.resultCard, { backgroundColor: theme.accent }]}>
          <Text style={styles.resultTitle}>Montante Final</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.finalAmount)}</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Juros Acumulados
            </Text>
            <Text style={[styles.summaryValue, { color: theme.success }]}>
              {formatCurrency(result.totalInterest)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Rendimento
            </Text>
            <Text style={[styles.summaryValue, { color: theme.success }]}>
              {formatPercent((result.totalInterest / (parseFloat(compoundPrincipal) || 1)) * 100)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTipCalculator = () => {
    const result = calculateTip(
      parseFloat(billAmount) || 0,
      parseFloat(tipPercent) || 0,
      parseInt(splitCount) || 1
    );

    return (
      <View>
        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Valor da Conta
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={billAmount}
            onChangeText={setBillAmount}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Gorjeta (%)
          </Text>
          <View style={styles.tipSelector}>
            {['10', '15', '18', '20', '25'].map((tip) => (
              <TouchableOpacity
                key={tip}
                style={[
                  styles.tipButton,
                  tipPercent === tip && { backgroundColor: theme.accent },
                ]}
                onPress={() => setTipPercent(tip)}
              >
                <Text
                  style={[
                    styles.tipText,
                    { color: tipPercent === tip ? '#FFF' : theme.text },
                  ]}
                >
                  {tip}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={tipPercent}
            onChangeText={setTipPercent}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Dividir Entre
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={splitCount}
            onChangeText={setSplitCount}
            keyboardType="number-pad"
            placeholder="1"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.resultCard, { backgroundColor: theme.accent }]}>
          <Text style={styles.resultTitle}>Por Pessoa</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.perPerson)}</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Valor da Gorjeta
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              {formatCurrency(result.tipAmount)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Total
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              {formatCurrency(result.totalAmount)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderDiscountCalculator = () => {
    const result = calculateDiscount(
      parseFloat(originalPrice) || 0,
      parseFloat(discountPercent) || 0
    );

    return (
      <View>
        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Preço Original
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={originalPrice}
            onChangeText={setOriginalPrice}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Desconto (%)
          </Text>
          <View style={styles.tipSelector}>
            {['10', '20', '30', '50', '70'].map((disc) => (
              <TouchableOpacity
                key={disc}
                style={[
                  styles.tipButton,
                  discountPercent === disc && { backgroundColor: theme.accent },
                ]}
                onPress={() => setDiscountPercent(disc)}
              >
                <Text
                  style={[
                    styles.tipText,
                    { color: discountPercent === disc ? '#FFF' : theme.text },
                  ]}
                >
                  {disc}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={discountPercent}
            onChangeText={setDiscountPercent}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.resultCard, { backgroundColor: theme.accent }]}>
          <Text style={styles.resultTitle}>Preço Final</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.finalPrice)}</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Economia
            </Text>
            <Text style={[styles.summaryValue, { color: theme.success }]}>
              {formatCurrency(result.savings)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderMarginCalculator = () => {
    const result = calculateMargin(
      parseFloat(cost) || 0,
      parseFloat(sellingPrice) || 0
    );

    return (
      <View>
        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Custo
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={cost}
            onChangeText={setCost}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.inputGroup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Preço de Venda
          </Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={sellingPrice}
            onChangeText={setSellingPrice}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={theme.textTertiary}
          />
        </View>

        <View style={[styles.resultCard, { backgroundColor: theme.accent }]}>
          <Text style={styles.resultTitle}>Lucro</Text>
          <Text style={styles.resultValue}>{formatCurrency(result.profit)}</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Margem de Lucro
            </Text>
            <Text style={[styles.summaryValue, { color: theme.success }]}>
              {formatPercent(result.marginPercentage)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Markup
            </Text>
            <Text style={[styles.summaryValue, { color: theme.success }]}>
              {formatPercent(result.markupPercentage)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCalculator = () => {
    switch (mode) {
      case 'loan':
        return renderLoanCalculator();
      case 'compound':
        return renderCompoundCalculator();
      case 'tip':
        return renderTipCalculator();
      case 'discount':
        return renderDiscountCalculator();
      case 'margin':
        return renderMarginCalculator();
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Mode Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.modeContainer}
        contentContainerStyle={styles.modeContent}
      >
        {modes.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[
              styles.modeButton,
              mode === m.id && { backgroundColor: theme.accent },
            ]}
            onPress={() => setMode(m.id)}
          >
            <Ionicons 
              name={m.icon} 
              size={20} 
              color={mode === m.id ? '#FFF' : theme.textSecondary} 
            />
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
      </ScrollView>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderCalculator()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modeContainer: {
    maxHeight: 70,
    paddingVertical: 10,
  },
  modeContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
    marginRight: 8,
    gap: 6,
  },
  modeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    fontSize: 24,
    fontWeight: '300',
    borderBottomWidth: 2,
    paddingVertical: 8,
  },
  resultCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginVertical: 16,
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
  },
  summaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  tipSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
  },
  tipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  frequencySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  frequencyButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
  },
  frequencyText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default FinancialScreen;
