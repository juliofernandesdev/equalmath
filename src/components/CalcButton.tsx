import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../contexts/ThemeContext';

interface CalcButtonProps {
  label: string;
  onPress: () => void;
  onLongPress?: () => void;
  variant?: 'number' | 'operator' | 'function' | 'action' | 'memory' | 'equal';
  size?: 'small' | 'medium' | 'large';
  span?: number;
  disabled?: boolean;
  active?: boolean;
  subLabel?: string;
}

export const CalcButton: React.FC<CalcButtonProps> = ({
  label,
  onPress,
  onLongPress,
  variant = 'number',
  size = 'medium',
  span = 1,
  disabled = false,
  active = false,
  subLabel,
}) => {
  const { theme, isDark } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePress = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    onPress();
  };

  const handleLongPress = async () => {
    if (onLongPress) {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {}
      onLongPress();
    }
  };

  const getBackgroundColor = (): string => {
    if (disabled) return theme.surfaceVariant;
    if (active) return theme.accent;
    
    switch (variant) {
      case 'equal':
        return theme.accent;
      case 'operator':
        return isDark ? '#333333' : '#E0E0E0';
      case 'function':
        return isDark ? '#2A2A2A' : '#F0F0F0';
      case 'action':
        return isDark ? '#3D3D3D' : '#D0D0D0';
      case 'memory':
        return isDark ? '#1A3D1A' : '#E8F5E9';
      default:
        return theme.surface;
    }
  };

  const getTextColor = (): string => {
    if (disabled) return theme.textTertiary;
    if (active || variant === 'equal') return '#FFFFFF';
    
    switch (variant) {
      case 'operator':
        return theme.accent;
      case 'function':
        return theme.textSecondary;
      case 'action':
        return isDark ? '#FF6B6B' : '#DC3545';
      case 'memory':
        return isDark ? '#4ADE80' : '#28A745';
      default:
        return theme.text;
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 32;
      default:
        return label.length > 3 ? 18 : 24;
    }
  };

  const buttonStyle: ViewStyle = {
    flex: span,
    backgroundColor: getBackgroundColor(),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginVertical: 4,
    minHeight: size === 'small' ? 48 : size === 'large' ? 80 : 64,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  };

  const textStyle: TextStyle = {
    color: getTextColor(),
    fontSize: getFontSize(),
    fontWeight: variant === 'number' ? '500' : '600',
  };

  const subLabelStyle: TextStyle = {
    color: theme.textTertiary,
    fontSize: 10,
    marginTop: 2,
  };

  return (
    <Animated.View style={{ flex: span, transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.7}
        delayLongPress={500}
      >
        <Text style={textStyle}>{label}</Text>
        {subLabel && <Text style={subLabelStyle}>{subLabel}</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CalcButton;
