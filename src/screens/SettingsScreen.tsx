import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeMode } from '../types';

type IoniconsName = keyof typeof Ionicons.glyphMap;

export const SettingsScreen: React.FC = () => {
  const { theme, themeMode, setThemeMode, isDark } = useTheme();

  const themeModes: { id: ThemeMode; label: string; icon: IoniconsName }[] = [
    { id: 'light', label: 'Claro', icon: 'sunny-outline' },
    { id: 'dark', label: 'Escuro', icon: 'moon-outline' },
    { id: 'system', label: 'Sistema', icon: 'phone-portrait-outline' },
  ];

  const SettingRow: React.FC<{
    icon: IoniconsName;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }> = ({ icon, title, subtitle, onPress, rightElement }) => (
    <TouchableOpacity
      style={[styles.settingRow, { backgroundColor: theme.surface }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Ionicons name={icon} size={24} color={theme.accent} style={styles.settingIcon} />
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* App Header */}
      <View style={styles.appHeader}>
        <View style={[styles.appIcon, { backgroundColor: theme.accent }]}>
          <Text style={styles.appIconText}>∑</Text>
        </View>
        <Text style={[styles.appName, { color: theme.text }]}>EqualMath</Text>
        <Text style={[styles.appVersion, { color: theme.textSecondary }]}>
          Versão 1.0.0
        </Text>
      </View>

      {/* Theme Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          APARÊNCIA
        </Text>
        
        <View style={[styles.themeSelector, { backgroundColor: theme.surface }]}>
          {themeModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.themeOption,
                themeMode === mode.id && { backgroundColor: theme.accent },
              ]}
              onPress={() => setThemeMode(mode.id)}
            >
              <Ionicons 
                name={mode.icon} 
                size={20} 
                color={themeMode === mode.id ? '#FFF' : theme.text} 
              />
              <Text
                style={[
                  styles.themeLabel,
                  { color: themeMode === mode.id ? '#FFF' : theme.text },
                ]}
              >
                {mode.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          FUNCIONALIDADES
        </Text>
        
        <View style={styles.featureList}>
          <View style={[styles.featureItem, { backgroundColor: theme.surface }]}>
            <Ionicons name="calculator-outline" size={24} color={theme.accent} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                Calculadora Básica
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                Operações fundamentais de matemática
              </Text>
            </View>
          </View>

          <View style={[styles.featureItem, { backgroundColor: theme.surface }]}>
            <Ionicons name="analytics-outline" size={24} color={theme.accent} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                Calculadora Científica
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                Trigonometria, logaritmos, potências
              </Text>
            </View>
          </View>

          <View style={[styles.featureItem, { backgroundColor: theme.surface }]}>
            <Ionicons name="code-slash-outline" size={24} color={theme.accent} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                Modo Programador
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                Binário, octal, decimal, hexadecimal
              </Text>
            </View>
          </View>

          <View style={[styles.featureItem, { backgroundColor: theme.surface }]}>
            <Ionicons name="swap-horizontal-outline" size={24} color={theme.accent} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                Conversor de Unidades
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                12 categorias, 100+ unidades
              </Text>
            </View>
          </View>

          <View style={[styles.featureItem, { backgroundColor: theme.surface }]}>
            <Ionicons name="cash-outline" size={24} color={theme.accent} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                Calculadora Financeira
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                Empréstimos, juros, gorjetas
              </Text>
            </View>
          </View>

          <View style={[styles.featureItem, { backgroundColor: theme.surface }]}>
            <Ionicons name="calendar-outline" size={24} color={theme.accent} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                Calculadora de Datas
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                Diferença entre datas, adicionar/subtrair
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          SOBRE
        </Text>
        
        <SettingRow
          icon="time-outline"
          title="Histórico"
          subtitle="Últimos 100 cálculos salvos"
        />
        
        <SettingRow
          icon="save-outline"
          title="Memória"
          subtitle="Armazenamento de valores"
        />
        
        <SettingRow
          icon="logo-react"
          title="Desenvolvido com"
          subtitle="React Native + Expo SDK 52"
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textTertiary }]}>
          Feito com ❤️ para você
        </Text>
        <Text style={[styles.footerText, { color: theme.textTertiary }]}>
          © 2024 EqualMath
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appIconText: {
    fontSize: 40,
    color: '#FFF',
    fontWeight: '300',
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  themeSelector: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 6,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  featureIcon: {
    // Now handled by Ionicons component directly
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    gap: 16,
  },
  settingIcon: {
    // Now handled by Ionicons component directly
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: 48,
  },
  footerText: {
    fontSize: 13,
    marginBottom: 4,
  },
});

export default SettingsScreen;
