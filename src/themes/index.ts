import { Theme } from '../types';

export const lightTheme: Theme = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  surfaceVariant: '#E9ECEF',
  primary: '#000000',
  primaryVariant: '#212529',
  secondary: '#6C757D',
  accent: '#0066FF',
  danger: '#DC3545',
  text: '#000000',
  textSecondary: '#495057',
  textTertiary: '#ADB5BD',
  border: '#DEE2E6',
  shadow: 'rgba(0, 0, 0, 0.1)',
  success: '#28A745',
  warning: '#FFC107',
};

export const darkTheme: Theme = {
  background: '#000000',
  surface: '#1A1A1A',
  surfaceVariant: '#2D2D2D',
  primary: '#FFFFFF',
  primaryVariant: '#E0E0E0',
  secondary: '#9E9E9E',
  accent: '#4DA6FF',
  danger: '#FF6B6B',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#666666',
  border: '#404040',
  shadow: 'rgba(0, 0, 0, 0.5)',
  success: '#4ADE80',
  warning: '#FBBF24',
};

export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};
