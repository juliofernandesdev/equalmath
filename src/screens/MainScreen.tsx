import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useCalculator } from '../contexts/CalculatorContext';
import Display from '../components/Display';
import BasicKeypad from '../components/BasicKeypad';
import ScientificKeypad from '../components/ScientificKeypad';
import ProgrammerKeypad from '../components/ProgrammerKeypad';
import ConverterScreen from './ConverterScreen';
import FinancialScreen from './FinancialScreen';
import DateScreen from './DateScreen';
import HistoryScreen from './HistoryScreen';
import SettingsScreen from './SettingsScreen';
import { CalculatorMode } from '../types';

const { width, height } = Dimensions.get('window');

type TabType = 'calculator' | 'history' | 'settings';

type IoniconsName = keyof typeof Ionicons.glyphMap;

export const MainScreen: React.FC = () => {
  const { theme, isDark } = useTheme();
  const { mode, setMode } = useCalculator();
  const [activeTab, setActiveTab] = useState<TabType>('calculator');
  const [showModeMenu, setShowModeMenu] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const calculatorModes: { id: CalculatorMode; label: string; icon: IoniconsName }[] = [
    { id: 'basic', label: 'Básica', icon: 'calculator-outline' },
    { id: 'scientific', label: 'Científica', icon: 'flask-outline' },
    { id: 'programmer', label: 'Programador', icon: 'code-slash-outline' },
    { id: 'converter', label: 'Conversor', icon: 'swap-horizontal-outline' },
    { id: 'financial', label: 'Financeira', icon: 'cash-outline' },
    { id: 'date', label: 'Data', icon: 'calendar-outline' },
  ];

  const tabs: { id: TabType; label: string; icon: IoniconsName }[] = [
    { id: 'calculator', label: 'Calculadora', icon: 'calculator' },
    { id: 'history', label: 'Histórico', icon: 'time-outline' },
    { id: 'settings', label: 'Ajustes', icon: 'settings-outline' },
  ];

  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
    setShowModeMenu(false);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 50;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          // Swipe right - go to simpler mode
          const currentIndex = calculatorModes.findIndex(m => m.id === mode);
          if (currentIndex > 0) {
            setMode(calculatorModes[currentIndex - 1].id);
          }
        } else if (gestureState.dx < -50) {
          // Swipe left - go to more complex mode
          const currentIndex = calculatorModes.findIndex(m => m.id === mode);
          if (currentIndex < calculatorModes.length - 1) {
            setMode(calculatorModes[currentIndex + 1].id);
          }
        }
      },
    })
  ).current;

  const renderKeypad = () => {
    switch (mode) {
      case 'scientific':
        return <ScientificKeypad />;
      case 'programmer':
        return <ProgrammerKeypad />;
      case 'converter':
        return <ConverterScreen />;
      case 'financial':
        return <FinancialScreen />;
      case 'date':
        return <DateScreen />;
      default:
        return <BasicKeypad />;
    }
  };

  const renderCalculatorScreen = () => (
    <View style={styles.calculatorContainer} {...panResponder.panHandlers}>
      {/* Mode Selector Button */}
      <TouchableOpacity
        style={[styles.modeButton, { backgroundColor: theme.surface }]}
        onPress={() => setShowModeMenu(!showModeMenu)}
      >
        <Ionicons 
          name={calculatorModes.find(m => m.id === mode)?.icon || 'calculator-outline'} 
          size={18} 
          color={theme.accent} 
        />
        <Text style={[styles.modeButtonText, { color: theme.text }]}>
          {calculatorModes.find(m => m.id === mode)?.label}
        </Text>
        <Ionicons 
          name={showModeMenu ? 'chevron-up' : 'chevron-down'} 
          size={16} 
          color={theme.textSecondary} 
        />
      </TouchableOpacity>

      {/* Mode Menu */}
      {showModeMenu && (
        <View style={[styles.modeMenu, { backgroundColor: theme.surface }]}>
          {calculatorModes.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[
                styles.modeMenuItem,
                mode === m.id && { backgroundColor: theme.accent },
              ]}
              onPress={() => handleModeChange(m.id)}
            >
              <Ionicons 
                name={m.icon} 
                size={22} 
                color={mode === m.id ? '#FFF' : theme.text} 
              />
              <Text
                style={[
                  styles.modeMenuText,
                  { color: mode === m.id ? '#FFF' : theme.text },
                ]}
              >
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Display - Only show for calculator modes */}
      {['basic', 'scientific', 'programmer'].includes(mode) && (
        <Display />
      )}

      {/* Keypad */}
      <View style={styles.keypadContainer}>
        {renderKeypad()}
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'history':
        return <HistoryScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return renderCalculatorScreen();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Main Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Tab Bar */}
      <View style={[styles.tabBar, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? theme.accent : theme.textSecondary}
            />
            <Text
              style={[
                styles.tabLabel,
                { 
                  color: activeTab === tab.id ? theme.accent : theme.textSecondary,
                  fontWeight: activeTab === tab.id ? '600' : '400',
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  calculatorContainer: {
    flex: 1,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
    gap: 8,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modeMenu: {
    position: 'absolute',
    top: 56,
    left: 16,
    right: 16,
    borderRadius: 16,
    padding: 8,
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  modeMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
  },
  modeMenuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  keypadContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
});

export default MainScreen;
