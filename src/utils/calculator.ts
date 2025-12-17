import { AngleUnit, NumberBase } from '../types';
import { evaluate, round } from 'mathjs';

export function evaluateExpression(
  expression: string, 
  angleUnit: AngleUnit = 'deg',
  base: NumberBase = 'DEC'
): number {
  try {
    // Replace display operators with math operators
    let sanitizedExpr = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/,/g, '');

    // Handle percentage
    sanitizedExpr = sanitizedExpr.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1/100)');

    // Handle implicit multiplication (e.g., 2(3) or (2)(3))
    sanitizedExpr = sanitizedExpr.replace(/(\d)\(/g, '$1*(');
    sanitizedExpr = sanitizedExpr.replace(/\)(\d)/g, ')*$1');
    sanitizedExpr = sanitizedExpr.replace(/\)\(/g, ')*(');

    // For programmer mode, convert to decimal first
    if (base !== 'DEC') {
      const radix = base === 'BIN' ? 2 : base === 'OCT' ? 8 : 16;
      const match = sanitizedExpr.match(/^([0-9A-Fa-f]+)$/);
      if (match) {
        return parseInt(match[1], radix);
      }
    }

    // Use mathjs for evaluation
    const result = evaluate(sanitizedExpr);
    
    if (typeof result === 'number') {
      if (!isFinite(result)) {
        throw new Error('Resultado infinito');
      }
      return result;
    }
    
    throw new Error('Expressão inválida');
  } catch (error) {
    throw new Error('Erro no cálculo');
  }
}

export function formatNumber(num: number, maxDecimals: number = 10): string {
  if (!isFinite(num)) {
    return num > 0 ? '∞' : '-∞';
  }
  
  if (isNaN(num)) {
    return 'Erro';
  }

  // Handle very large or very small numbers with scientific notation
  if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(6);
  }

  // Round to avoid floating point errors
  const rounded = round(num, maxDecimals) as number;
  
  // Format with thousand separators for large integers
  const parts = rounded.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return parts.join('.');
}

export function convertBase(value: string, fromBase: NumberBase, toBase: NumberBase): string {
  const radixMap: Record<NumberBase, number> = {
    'DEC': 10,
    'BIN': 2,
    'OCT': 8,
    'HEX': 16,
  };

  try {
    const decimal = parseInt(value, radixMap[fromBase]);
    if (isNaN(decimal)) return '0';

    switch (toBase) {
      case 'BIN':
        return decimal.toString(2);
      case 'OCT':
        return decimal.toString(8);
      case 'HEX':
        return decimal.toString(16).toUpperCase();
      default:
        return decimal.toString(10);
    }
  } catch {
    return '0';
  }
}

export function getProgrammerValues(decimal: number, bitSize: 8 | 16 | 32 | 64): {
  decimal: string;
  binary: string;
  octal: string;
  hexadecimal: string;
} {
  // Mask based on bit size
  const mask = bitSize === 64 ? BigInt('0xFFFFFFFFFFFFFFFF') : 
               BigInt((1n << BigInt(bitSize)) - 1n);
  
  const value = BigInt(Math.floor(decimal)) & mask;
  
  return {
    decimal: value.toString(10),
    binary: value.toString(2).padStart(bitSize, '0'),
    octal: value.toString(8),
    hexadecimal: value.toString(16).toUpperCase(),
  };
}

export function calculatePercentage(value: number, percentage: number): number {
  return (value * percentage) / 100;
}

export function calculateTip(amount: number, tipPercentage: number, splitCount: number = 1): {
  tipAmount: number;
  totalAmount: number;
  perPerson: number;
} {
  const tipAmount = (amount * tipPercentage) / 100;
  const totalAmount = amount + tipAmount;
  const perPerson = totalAmount / splitCount;
  
  return { tipAmount, totalAmount, perPerson };
}

export function calculateLoan(
  principal: number,
  annualRate: number,
  months: number
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
} {
  const monthlyRate = annualRate / 100 / 12;
  
  if (monthlyRate === 0) {
    const monthlyPayment = principal / months;
    return {
      monthlyPayment,
      totalPayment: principal,
      totalInterest: 0,
    };
  }
  
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
    (Math.pow(1 + monthlyRate, months) - 1);
  
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;
  
  return { monthlyPayment, totalPayment, totalInterest };
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundingPerYear: number = 12
): {
  finalAmount: number;
  totalInterest: number;
} {
  const rate = annualRate / 100;
  const finalAmount = principal * Math.pow(1 + rate / compoundingPerYear, compoundingPerYear * years);
  const totalInterest = finalAmount - principal;
  
  return { finalAmount, totalInterest };
}

export function calculateDiscount(
  originalPrice: number,
  discountPercentage: number
): {
  discountAmount: number;
  finalPrice: number;
  savings: number;
} {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;
  
  return { 
    discountAmount, 
    finalPrice, 
    savings: discountAmount 
  };
}

export function calculateMargin(cost: number, sellingPrice: number): {
  profit: number;
  marginPercentage: number;
  markupPercentage: number;
} {
  const profit = sellingPrice - cost;
  const marginPercentage = (profit / sellingPrice) * 100;
  const markupPercentage = (profit / cost) * 100;
  
  return { profit, marginPercentage, markupPercentage };
}

export function dateDifference(date1: Date, date2: Date): {
  days: number;
  weeks: number;
  months: number;
  years: number;
} {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  
  let months = 0;
  let years = 0;
  
  const start = date1 < date2 ? date1 : date2;
  const end = date1 < date2 ? date2 : date1;
  
  years = end.getFullYear() - start.getFullYear();
  months = end.getMonth() - start.getMonth() + (years * 12);
  
  if (end.getDate() < start.getDate()) {
    months--;
  }
  
  years = Math.floor(months / 12);
  months = months % 12;
  
  return { days, weeks, months: months + years * 12, years };
}

export function addToDate(
  date: Date, 
  value: number, 
  unit: 'days' | 'weeks' | 'months' | 'years'
): Date {
  const result = new Date(date);
  
  switch (unit) {
    case 'days':
      result.setDate(result.getDate() + value);
      break;
    case 'weeks':
      result.setDate(result.getDate() + value * 7);
      break;
    case 'months':
      result.setMonth(result.getMonth() + value);
      break;
    case 'years':
      result.setFullYear(result.getFullYear() + value);
      break;
  }
  
  return result;
}

// Statistics functions
export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function calculateStandardDeviation(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = calculateMean(values);
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  return Math.sqrt(squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length);
}

export function calculateVariance(values: number[]): number {
  const std = calculateStandardDeviation(values);
  return std * std;
}

// Number theory functions
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.floor(a));
  b = Math.abs(Math.floor(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function primeFactors(n: number): number[] {
  n = Math.abs(Math.floor(n));
  const factors: number[] = [];
  let d = 2;
  while (n > 1) {
    while (n % d === 0) {
      factors.push(d);
      n /= d;
    }
    d++;
    if (d * d > n && n > 1) {
      factors.push(n);
      break;
    }
  }
  return factors;
}
