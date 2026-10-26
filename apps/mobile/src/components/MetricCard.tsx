import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, radius } from '@/theme';
import { Badge, BadgeVariant } from './Badge';

interface MetricCardProps {
  title: string;
  value: number | string | null;
  unit: string;
  icon?: React.ReactNode;
  accentColor?: string;
  badgeLabel?: string;
  badgeVariant?: BadgeVariant;
  subtitle?: string;
  style?: ViewStyle;
}

export function MetricCard({
  title,
  value,
  unit,
  icon,
  accentColor = colors.respiration,
  badgeLabel,
  badgeVariant = 'cyan',
  subtitle,
  style,
}: MetricCardProps) {
  const displayValue = value === null || value === undefined ? '--' : value;

  return (
    <View style={[styles.card, style]}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
        {badgeLabel && (
          <Badge label={badgeLabel} variant={badgeVariant} dot />
        )}
      </View>

      {/* Main Metric Value */}
      <View style={styles.valueRow}>
        <Text style={[styles.value, { color: accentColor }]}>
          {displayValue}
        </Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      {/* Subtitle / Context */}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginVertical: spacing.xxs,
  },
  value: {
    fontSize: typography.sizes.hero,
    fontWeight: typography.weights.heavy,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: -1,
  },
  unit: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
});
