import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Header, MetricCard, Button, Badge } from '@/components';
import { colors, typography, spacing, radius } from '@/theme';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <Screen scrollable>
      <Header
        title="PRAANA"
        subtitle="Aerobic Performance & Respiration"
        rightElement={
          <Badge label="MOCK SENSOR" variant="amber" dot />
        }
      />

      {/* Readiness Hero Card */}
      <View style={styles.readinessCard}>
        <View style={styles.readinessHeader}>
          <View style={styles.readinessTitleRow}>
            <Ionicons name="pulse" size={20} color={colors.recovery} />
            <Text style={styles.readinessLabel}>TODAY'S READINESS</Text>
          </View>
          <Badge label="ESTIMATED" variant="muted" />
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.scoreNumber}>88</Text>
          <Text style={styles.scoreScale}>/ 100</Text>
        </View>

        <Text style={styles.readinessStatus}>
          Optimal Parasympathetic Balance. Ready for high ventilatory strain or VT2 threshold intervals.
        </Text>
      </View>

      {/* Quick Action */}
      <View style={styles.actionSection}>
        <Button
          title="Start Live Workout"
          variant="primary"
          size="lg"
          onPress={() => router.push('/(tabs)/workout')}
          icon={<Ionicons name="play" size={18} color={colors.textInverse} />}
        />
      </View>

      {/* Key Physiological Indicators */}
      <Text style={styles.sectionTitle}>BASELINE BIOMETRICS</Text>
      <View style={styles.grid}>
        <MetricCard
          title="BREATHING RATE"
          value={14}
          unit="BrPM"
          accentColor={colors.respiration}
          badgeLabel="RESTING"
          badgeVariant="cyan"
          subtitle="Typical adult: 12-18 BrPM"
          style={styles.gridCard}
        />
        <MetricCard
          title="RESTING HR"
          value={52}
          unit="BPM"
          accentColor={colors.heartRate}
          badgeLabel="OPTIMAL"
          badgeVariant="jade"
          subtitle="Baseline average"
          style={styles.gridCard}
        />
        <MetricCard
          title="HRV (RMSSD)"
          value={68}
          unit="ms"
          accentColor={colors.hrv}
          badgeLabel="HIGH"
          badgeVariant="jade"
          subtitle="Autonomic recovery"
          style={styles.gridCard}
        />
        <MetricCard
          title="EST. VO₂ MAX"
          value={54.2}
          unit="ml/kg/min"
          accentColor={colors.respiration}
          badgeLabel="ESTIMATED"
          badgeVariant="muted"
          subtitle="Top 15% for age"
          style={styles.gridCard}
        />
      </View>

      {/* Information Banner */}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={20} color={colors.respiration} />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Why track breathing?</Text>
          <Text style={styles.infoText}>
            Breathing frequency responds immediately to metabolic acidosis before heart rate ramps up.
          </Text>
        </View>
        <Button
          title="Learn"
          variant="secondary"
          size="sm"
          onPress={() => router.push('/modal')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  readinessCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  readinessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  readinessTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  readinessLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xxs,
    marginVertical: spacing.xs,
  },
  scoreNumber: {
    fontSize: typography.sizes.hero + 6,
    fontWeight: typography.weights.heavy,
    fontFamily: typography.fontFamily.mono,
    color: colors.recovery,
  },
  scoreScale: {
    fontSize: typography.sizes.md,
    color: colors.textMuted,
    fontWeight: typography.weights.semibold,
  },
  readinessStatus: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actionSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  grid: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  gridCard: {
    marginBottom: spacing.xxs,
  },
  infoBox: {
    backgroundColor: colors.cardSubtle,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  infoText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
});
