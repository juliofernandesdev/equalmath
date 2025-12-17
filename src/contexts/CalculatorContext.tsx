import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  CalculatorState, 
  CalculatorMode, 
  AngleUnit, 
  HistoryEntry, 
  NumberBase 
} from '../types';
import { evaluateExpression, formatNumber } from '../utils/calculator';

interface CalculatorContextType extends CalculatorState {
  // Display actions
  appendToDisplay: (value: string) => void;
  clearDisplay: () => void;
  clearAll: () => void;
  deleteLastChar: () => void;
  
  // Calculation actions
  calculate: () => void;
  setExpression: (expr: string) => void;
  
  // Mode actions
  setMode: (mode: CalculatorMode) => void;
  setAngleUnit: (unit: AngleUnit) => void;
  toggleSecondFunction: () => void;
  toggleInverse: () => void;
  
  // Memory actions
  memoryClear: () => void;
  memoryRecall: (index?: number) => void;
  memoryAdd: () => void;
  memorySubtract: () => void;
  memoryStore: () => void;
  
  // History actions
  clearHistory: () => void;
  useHistoryEntry: (entry: HistoryEntry) => void;
  
  // Programmer mode
  setProgrammerBase: (base: NumberBase) => void;
  setProgrammerBitSize: (size: 8 | 16 | 32 | 64) => void;
  
  // Special functions
  applyFunction: (func: string) => void;
  insertConstant: (constant: string) => void;
  toggleSign: () => void;
  insertPercentage: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

const HISTORY_STORAGE_KEY = '@equalmath_history';
const MEMORY_STORAGE_KEY = '@equalmath_memory';

const initialState: CalculatorState = {
  display: '0',
  expression: '',
  memory: [0],
  history: [],
  mode: 'basic',
  angleUnit: 'deg',
  isSecondFunction: false,
  isInverse: false,
  hasError: false,
  programmerBase: 'DEC',
  programmerBitSize: 64,
};

export const CalculatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CalculatorState>(initialState);

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    saveHistory();
  }, [state.history]);

  useEffect(() => {
    saveMemory();
  }, [state.memory]);

  const loadStoredData = async () => {
    try {
      const [historyData, memoryData] = await Promise.all([
        AsyncStorage.getItem(HISTORY_STORAGE_KEY),
        AsyncStorage.getItem(MEMORY_STORAGE_KEY),
      ]);

      setState(prev => ({
        ...prev,
        history: historyData ? JSON.parse(historyData) : [],
        memory: memoryData ? JSON.parse(memoryData) : [0],
      }));
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  const saveHistory = async () => {
    try {
      await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.history.slice(0, 100)));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const saveMemory = async () => {
    try {
      await AsyncStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(state.memory));
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  const appendToDisplay = useCallback((value: string) => {
    setState(prev => {
      if (prev.hasError) {
        return { ...prev, display: value, expression: '', hasError: false };
      }

      let newDisplay = prev.display;
      let newExpression = prev.expression;

      // Handle operators
      const operators = ['+', '-', '×', '÷', '^', '%'];
      const isOperator = operators.includes(value);

      if (isOperator) {
        // Don't allow operator at the start (except minus for negative)
        if (newDisplay === '0' && value !== '-') {
          return prev;
        }
        // Replace last operator if needed
        const lastChar = newDisplay.slice(-1);
        if (operators.includes(lastChar)) {
          newDisplay = newDisplay.slice(0, -1) + value;
        } else {
          newDisplay = newDisplay + value;
        }
      } else if (value === '.') {
        // Handle decimal point
        const parts = newDisplay.split(/[+\-×÷^%]/);
        const lastPart = parts[parts.length - 1];
        if (!lastPart.includes('.')) {
          newDisplay = newDisplay + value;
        }
      } else if (value === '(' || value === ')') {
        if (newDisplay === '0' && value === '(') {
          newDisplay = value;
        } else {
          newDisplay = newDisplay + value;
        }
      } else {
        // Handle numbers
        if (newDisplay === '0' && value !== '.') {
          newDisplay = value;
        } else {
          newDisplay = newDisplay + value;
        }
      }

      return { ...prev, display: newDisplay, expression: newExpression };
    });
  }, []);

  const clearDisplay = useCallback(() => {
    setState(prev => ({ ...prev, display: '0', hasError: false }));
  }, []);

  const clearAll = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      display: '0', 
      expression: '', 
      hasError: false,
      isSecondFunction: false,
      isInverse: false,
    }));
  }, []);

  const deleteLastChar = useCallback(() => {
    setState(prev => {
      if (prev.hasError) {
        return { ...prev, display: '0', hasError: false };
      }
      const newDisplay = prev.display.length > 1 ? prev.display.slice(0, -1) : '0';
      return { ...prev, display: newDisplay };
    });
  }, []);

  const calculate = useCallback(() => {
    setState(prev => {
      if (prev.hasError) return prev;

      try {
        const result = evaluateExpression(prev.display, prev.angleUnit, prev.programmerBase);
        const formattedResult = formatNumber(result);

        const historyEntry: HistoryEntry = {
          id: Date.now().toString(),
          expression: prev.display,
          result: formattedResult,
          timestamp: Date.now(),
          mode: prev.mode,
        };

        return {
          ...prev,
          display: formattedResult,
          expression: prev.display,
          history: [historyEntry, ...prev.history].slice(0, 100),
          hasError: false,
        };
      } catch (error) {
        return { ...prev, display: 'Erro', hasError: true };
      }
    });
  }, []);

  const setExpression = useCallback((expr: string) => {
    setState(prev => ({ ...prev, expression: expr }));
  }, []);

  const setMode = useCallback((mode: CalculatorMode) => {
    setState(prev => ({ ...prev, mode, display: '0', expression: '', hasError: false }));
  }, []);

  const setAngleUnit = useCallback((angleUnit: AngleUnit) => {
    setState(prev => ({ ...prev, angleUnit }));
  }, []);

  const toggleSecondFunction = useCallback(() => {
    setState(prev => ({ ...prev, isSecondFunction: !prev.isSecondFunction }));
  }, []);

  const toggleInverse = useCallback(() => {
    setState(prev => ({ ...prev, isInverse: !prev.isInverse }));
  }, []);

  const memoryClear = useCallback(() => {
    setState(prev => ({ ...prev, memory: [0] }));
  }, []);

  const memoryRecall = useCallback((index: number = 0) => {
    setState(prev => {
      const value = prev.memory[index] ?? 0;
      return { ...prev, display: formatNumber(value) };
    });
  }, []);

  const memoryAdd = useCallback(() => {
    setState(prev => {
      const currentValue = parseFloat(prev.display.replace(/,/g, '')) || 0;
      const newMemory = [...prev.memory];
      newMemory[0] = (newMemory[0] || 0) + currentValue;
      return { ...prev, memory: newMemory };
    });
  }, []);

  const memorySubtract = useCallback(() => {
    setState(prev => {
      const currentValue = parseFloat(prev.display.replace(/,/g, '')) || 0;
      const newMemory = [...prev.memory];
      newMemory[0] = (newMemory[0] || 0) - currentValue;
      return { ...prev, memory: newMemory };
    });
  }, []);

  const memoryStore = useCallback(() => {
    setState(prev => {
      const currentValue = parseFloat(prev.display.replace(/,/g, '')) || 0;
      const newMemory = [...prev.memory];
      newMemory[0] = currentValue;
      return { ...prev, memory: newMemory };
    });
  }, []);

  const clearHistory = useCallback(() => {
    setState(prev => ({ ...prev, history: [] }));
  }, []);

  const useHistoryEntry = useCallback((entry: HistoryEntry) => {
    setState(prev => ({ ...prev, display: entry.result, expression: entry.expression }));
  }, []);

  const setProgrammerBase = useCallback((base: NumberBase) => {
    setState(prev => {
      // Convert current value to new base display
      const currentDecimal = parseInt(prev.display, 
        prev.programmerBase === 'BIN' ? 2 : 
        prev.programmerBase === 'OCT' ? 8 : 
        prev.programmerBase === 'HEX' ? 16 : 10
      ) || 0;

      let newDisplay: string;
      switch (base) {
        case 'BIN':
          newDisplay = currentDecimal.toString(2);
          break;
        case 'OCT':
          newDisplay = currentDecimal.toString(8);
          break;
        case 'HEX':
          newDisplay = currentDecimal.toString(16).toUpperCase();
          break;
        default:
          newDisplay = currentDecimal.toString(10);
      }

      return { ...prev, programmerBase: base, display: newDisplay || '0' };
    });
  }, []);

  const setProgrammerBitSize = useCallback((size: 8 | 16 | 32 | 64) => {
    setState(prev => ({ ...prev, programmerBitSize: size }));
  }, []);

  const applyFunction = useCallback((func: string) => {
    setState(prev => {
      if (prev.hasError) return prev;

      try {
        const currentValue = parseFloat(prev.display.replace(/,/g, '')) || 0;
        let result: number;
        const angleMultiplier = prev.angleUnit === 'deg' ? Math.PI / 180 : 
                                prev.angleUnit === 'grad' ? Math.PI / 200 : 1;

        switch (func) {
          case 'sin':
            result = prev.isInverse ? Math.asin(currentValue) / angleMultiplier : Math.sin(currentValue * angleMultiplier);
            break;
          case 'cos':
            result = prev.isInverse ? Math.acos(currentValue) / angleMultiplier : Math.cos(currentValue * angleMultiplier);
            break;
          case 'tan':
            result = prev.isInverse ? Math.atan(currentValue) / angleMultiplier : Math.tan(currentValue * angleMultiplier);
            break;
          case 'sinh':
            result = prev.isInverse ? Math.asinh(currentValue) : Math.sinh(currentValue);
            break;
          case 'cosh':
            result = prev.isInverse ? Math.acosh(currentValue) : Math.cosh(currentValue);
            break;
          case 'tanh':
            result = prev.isInverse ? Math.atanh(currentValue) : Math.tanh(currentValue);
            break;
          case 'log':
            result = Math.log10(currentValue);
            break;
          case 'ln':
            result = Math.log(currentValue);
            break;
          case 'log2':
            result = Math.log2(currentValue);
            break;
          case 'sqrt':
            result = Math.sqrt(currentValue);
            break;
          case 'cbrt':
            result = Math.cbrt(currentValue);
            break;
          case 'square':
            result = Math.pow(currentValue, 2);
            break;
          case 'cube':
            result = Math.pow(currentValue, 3);
            break;
          case 'exp':
            result = Math.exp(currentValue);
            break;
          case 'abs':
            result = Math.abs(currentValue);
            break;
          case 'floor':
            result = Math.floor(currentValue);
            break;
          case 'ceil':
            result = Math.ceil(currentValue);
            break;
          case 'round':
            result = Math.round(currentValue);
            break;
          case 'factorial':
            result = factorial(currentValue);
            break;
          case 'inverse':
            result = 1 / currentValue;
            break;
          case '10^x':
            result = Math.pow(10, currentValue);
            break;
          case 'e^x':
            result = Math.exp(currentValue);
            break;
          case '2^x':
            result = Math.pow(2, currentValue);
            break;
          default:
            result = currentValue;
        }

        return { 
          ...prev, 
          display: formatNumber(result), 
          isInverse: false 
        };
      } catch (error) {
        return { ...prev, display: 'Erro', hasError: true };
      }
    });
  }, []);

  const insertConstant = useCallback((constant: string) => {
    setState(prev => {
      let value: string;
      switch (constant) {
        case 'pi':
          value = Math.PI.toString();
          break;
        case 'e':
          value = Math.E.toString();
          break;
        case 'phi':
          value = ((1 + Math.sqrt(5)) / 2).toString(); // Golden ratio
          break;
        case 'sqrt2':
          value = Math.SQRT2.toString();
          break;
        case 'sqrt3':
          value = Math.sqrt(3).toString();
          break;
        default:
          value = prev.display;
      }
      return { ...prev, display: value };
    });
  }, []);

  const toggleSign = useCallback(() => {
    setState(prev => {
      if (prev.hasError) return prev;
      const currentValue = parseFloat(prev.display.replace(/,/g, '')) || 0;
      return { ...prev, display: formatNumber(-currentValue) };
    });
  }, []);

  const insertPercentage = useCallback(() => {
    setState(prev => {
      if (prev.hasError) return prev;
      const currentValue = parseFloat(prev.display.replace(/,/g, '')) || 0;
      return { ...prev, display: formatNumber(currentValue / 100) };
    });
  }, []);

  const value: CalculatorContextType = {
    ...state,
    appendToDisplay,
    clearDisplay,
    clearAll,
    deleteLastChar,
    calculate,
    setExpression,
    setMode,
    setAngleUnit,
    toggleSecondFunction,
    toggleInverse,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
    clearHistory,
    useHistoryEntry,
    setProgrammerBase,
    setProgrammerBitSize,
    applyFunction,
    insertConstant,
    toggleSign,
    insertPercentage,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = (): CalculatorContextType => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};

// Helper function for factorial
function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  if (!Number.isInteger(n)) {
    // Gamma function approximation for non-integers
    return gamma(n + 1);
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Gamma function approximation (Lanczos approximation)
function gamma(z: number): number {
  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  }
  z -= 1;
  const g = 7;
  const c = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  let x = c[0];
  for (let i = 1; i < g + 2; i++) {
    x += c[i] / (z + i);
  }
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}
