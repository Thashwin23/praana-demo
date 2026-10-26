import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '@/theme';

export type BadgeVariant =
  | 'cyan'
  | 'coral'
  | 'jade'
  | 'amber'
  | 'red'
  | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<
  BadgeVariant,
  { bg: string; text: string; dot: string; border: string }
> = {
  cyan: {
    bg: 'rgba(0, 229, 255, 0.12)',
    text: colors.respiration,
    dot: colors.respiration,
    border: 'rgba(0, 229, 255, 0.3)',
  },
  coral: {
    bg: 'rgba(255, 51, 102, 0.12)',
    text: colors.heartRate,
    dot: colors.heartRate,
    border: 'rgba(255, 51, 102, 0.3)',
  },
  jade: {
    bg: 'rgba(0, 230, 118, 0.12)',
    text: colors.recovery,
    dot: colors.recovery,
    border: 'rgba(0, 230, 118, 0.3)',
  },
  amber: {
    bg: 'rgba(255, 176, 32, 0.12)',
    text: colors.warning,
    dot: colors.warning,
    border: 'rgba(255, 176, 32, 0.3)',
  },
  red: {
    bg: 'rgba(239, 68, 68, 0.12)',
    text: colors.error,
    dot: colors.error,
    border: 'rgba(239, 68, 68, 0.3)',
  },
  muted: {
    bg: 'rgba(148, 163, 184, 0.1)',
    text: colors.textSecondary,
    dot: colors.textMuted,
    border: 'rgba(148, 163, 184, 0.2)',
  },
};

export function Badge({ label, variant = 'cyan', dot = false }: BadgeProps) {
  const current = variantStyles[variant];

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: current.bg, borderColor: current.border },
      ]}
    >
      {dot && <View style={[styles.dot, { backgroundColor: current.dot }]} />}
      <Text style={[styles.text, { color: current.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: spacing.xxs - 1,
    borderRadius: radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
