import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, radius } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
}: ButtonProps) {
  const getContainerStyle = (pressed: boolean) => {
    return [
      styles.base,
      styles[variant],
      styles[size],
      disabled && styles.disabled,
      pressed && !disabled && styles.pressed,
      style,
    ];
  };

  const getTextStyle = (): TextStyle[] => {
    return [
      styles.textBase,
      styles[`${variant}Text` as keyof typeof styles] as TextStyle,
      styles[`${size}Text` as keyof typeof styles] as TextStyle,
      disabled ? styles.disabledText : {},
    ];
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => getContainerStyle(pressed)}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.textInverse : colors.textPrimary}
        />
      ) : (
        <>
          {icon ? <Text style={styles.iconContainer}>{icon}</Text> : null}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.error,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  sm: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  md: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
  },
  lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.45,
  },
  textBase: {
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  primaryText: {
    color: colors.textInverse,
  },
  secondaryText: {
    color: colors.textPrimary,
  },
  dangerText: {
    color: colors.textPrimary,
  },
  ghostText: {
    color: colors.textSecondary,
  },
  smText: {
    fontSize: typography.sizes.xs,
  },
  mdText: {
    fontSize: typography.sizes.sm,
  },
  lgText: {
    fontSize: typography.sizes.md,
  },
  disabledText: {
    color: colors.textMuted,
  },
  iconContainer: {
    marginRight: spacing.xs,
  },
});
