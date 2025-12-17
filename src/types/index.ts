// Types for the calculator app

export type CalculatorMode = 'basic' | 'scientific' | 'programmer' | 'converter' | 'financial' | 'date';

export type AngleUnit = 'deg' | 'rad' | 'grad';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  mode: CalculatorMode;
}

export interface MemoryValue {
  value: number;
  label: string;
}

export interface ConversionCategory {
  id: string;
  name: string;
  icon: string;
  units: ConversionUnit[];
}

export interface ConversionUnit {
  id: string;
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface FinancialCalculation {
  type: 'loan' | 'investment' | 'tip' | 'discount' | 'margin' | 'compound';
  inputs: Record<string, number>;
  result: Record<string, number>;
}

export interface DateCalculation {
  type: 'difference' | 'add' | 'subtract';
  date1: Date;
  date2?: Date;
  value?: number;
  unit?: 'days' | 'weeks' | 'months' | 'years';
  result: string;
}

export interface ProgrammerValue {
  decimal: string;
  binary: string;
  octal: string;
  hexadecimal: string;
  bitSize: 8 | 16 | 32 | 64;
}

export type NumberBase = 'DEC' | 'BIN' | 'OCT' | 'HEX';

export interface ButtonConfig {
  label: string;
  value: string;
  type: 'number' | 'operator' | 'function' | 'action' | 'memory';
  span?: number;
  color?: 'primary' | 'secondary' | 'accent' | 'danger';
}

export interface Theme {
  background: string;
  surface: string;
  surfaceVariant: string;
  primary: string;
  primaryVariant: string;
  secondary: string;
  accent: string;
  danger: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  shadow: string;
  success: string;
  warning: string;
}

export interface CalculatorState {
  display: string;
  expression: string;
  memory: number[];
  history: HistoryEntry[];
  mode: CalculatorMode;
  angleUnit: AngleUnit;
  isSecondFunction: boolean;
  isInverse: boolean;
  hasError: boolean;
  programmerBase: NumberBase;
  programmerBitSize: 8 | 16 | 32 | 64;
}
