import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Header, Badge } from '@/components';
import { colors, typography, spacing, radius } from '@/theme';

interface MockSession {
  id: string;
  title: string;
  date: string;
  duration: string;
  avgHr: number;
  avgBr: number;
  trimpLoad: number;
  activity: string;
}

const mockSessions: MockSession[] = [
  {
    id: 'sess-1',
    title: 'Threshold Interval Run',
    date: 'Today, 07:15 AM',
    duration: '38:42',
    avgHr: 158,
    avgBr: 29,
    trimpLoad: 78,
    activity: 'walk',
  },
  {
    id: 'sess-2',
    title: 'Aerobic Base Ride (VT1)',
    date: 'Yesterday, 06:30 PM',
    duration: '52:10',
    avgHr: 134,
    avgBr: 21,
    trimpLoad: 62,
    activity: 'bicycle',
  },
  {
    id: 'sess-3',
    title: 'Ventilatory Ramp Test',
    date: '24 Oct 2026',
    duration: '22:15',
    avgHr: 168,
    avgBr: 36,
    trimpLoad: 55,
    activity: 'trending-up',
  },
];

export default function HistoryScreen() {
  return (
    <Screen scrollable>
      <Header
        title="HISTORY"
        subtitle="3 Recorded Sessions"
        rightElement={<Badge label="DEMO SESSIONS" variant="muted" />}
      />

      <View style={styles.list}>
        {mockSessions.map((session) => (
          <View key={session.id} style={styles.sessionCard}>
            {/* Header */}
            <View style={styles.sessionHeader}>
              <View style={styles.titleGroup}>
                <Ionicons
                  name={session.activity as any}
                  size={18}
                  color={colors.respiration}
                />
                <Text style={styles.sessionTitle}>{session.title}</Text>
              </View>
              <Text style={styles.sessionDate}>{session.date}</Text>
            </View>

            {/* Metrics Row */}
            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>DURATION</Text>
                <Text style={styles.metricValue}>{session.duration}</Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>AVG HR</Text>
                <Text style={[styles.metricValue, { color: colors.heartRate }]}>
                  {session.avgHr}{' '}
                  <Text style={styles.metricUnit}>BPM</Text>
                </Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>AVG BREATH</Text>
                <Text style={[styles.metricValue, { color: colors.respiration }]}>
                  {session.avgBr}{' '}
                  <Text style={styles.metricUnit}>BrPM</Text>
                </Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>TRIMP</Text>
                <Text style={[styles.metricValue, { color: colors.cadence }]}>
                  {session.trimpLoad}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  sessionCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sessionTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  sessionDate: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: spacing.xxs,
  },
  metricValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily.mono,
    color: colors.textPrimary,
  },
  metricUnit: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.regular,
    color: colors.textMuted,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.borderSubtle,
  },
});
