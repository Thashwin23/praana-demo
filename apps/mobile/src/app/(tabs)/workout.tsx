import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Header, MetricCard, Button, Badge } from '@/components';
import { colors, typography, spacing, radius } from '@/theme';
import { WorkoutState } from '@/types';

export default function WorkoutScreen() {
  const [workoutState, setWorkoutState] = useState<WorkoutState>('idle');
  const [selectedActivity, setSelectedActivity] = useState<'running' | 'cycling' | 'ramp'>('running');

  return (
    <Screen scrollable>
      <Header
        title="WORKOUT"
        subtitle={workoutState === 'idle' ? 'Ready to Record' : 'Session In Progress'}
        rightElement={
          <Badge
            label={workoutState === 'idle' ? 'STANDBY' : 'RECORDING'}
            variant={workoutState === 'idle' ? 'muted' : 'coral'}
            dot
          />
        }
      />

      {/* Activity Mode Selector */}
      {workoutState === 'idle' && (
        <View style={styles.activitySelector}>
          <Text style={styles.sectionLabel}>SELECT ACTIVITY</Text>
          <View style={styles.activityButtons}>
            {(
              [
                { id: 'running', label: 'Running', icon: 'walk' },
                { id: 'cycling', label: 'Cycling', icon: 'bicycle' },
                { id: 'ramp', label: 'VT Ramp Test', icon: 'trending-up' },
              ] as const
            ).map((act) => {
              const active = selectedActivity === act.id;
              return (
                <Button
                  key={act.id}
                  title={act.label}
                  variant={active ? 'primary' : 'secondary'}
                  size="sm"
                  onPress={() => setSelectedActivity(act.id)}
                  icon={
                    <Ionicons
                      name={act.icon as any}
                      size={16}
                      color={active ? colors.textInverse : colors.textSecondary}
                    />
                  }
                  style={styles.activityButton}
                />
              );
            })}
          </View>
        </View>
      )}

      {/* Session Timer & Status */}
      <View style={styles.timerCard}>
        <Text style={styles.timerLabel}>ELAPSED DURATION</Text>
        <Text style={styles.timerValue}>
          {workoutState === 'idle' ? '00:00:00' : '00:14:32'}
        </Text>
        <View style={styles.qualityRow}>
          <Ionicons name="wifi" size={14} color={colors.recovery} />
          <Text style={styles.qualityText}>Mock Sensor Telemetry: 100% Quality</Text>
        </View>
      </View>

      {/* Primary Live Telemetry */}
      <Text style={styles.sectionLabel}>LIVE TELEMETRY (SIMULATED)</Text>
      <View style={styles.telemetryGrid}>
        <MetricCard
          title="BREATHING RATE"
          value={workoutState === 'idle' ? '--' : 28}
          unit="BrPM"
          accentColor={colors.respiration}
          badgeLabel={workoutState === 'idle' ? 'OFFLINE' : 'LIVE'}
          badgeVariant={workoutState === 'idle' ? 'muted' : 'cyan'}
          subtitle="VT1 threshold: ~26 BrPM"
        />
        <MetricCard
          title="HEART RATE"
          value={workoutState === 'idle' ? '--' : 162}
          unit="BPM"
          accentColor={colors.heartRate}
          badgeLabel={workoutState === 'idle' ? 'OFFLINE' : 'LIVE'}
          badgeVariant={workoutState === 'idle' ? 'muted' : 'coral'}
          subtitle="Zone 4 (Threshold)"
        />
        <MetricCard
          title="CADENCE"
          value={workoutState === 'idle' ? '--' : 174}
          unit="SPM"
          accentColor={colors.cadence}
          badgeLabel="IMU"
          badgeVariant="amber"
          subtitle="Target: 170-180 SPM"
        />
        <MetricCard
          title="BODY SHOCK"
          value={workoutState === 'idle' ? '--' : 2.4}
          unit="G"
          accentColor={colors.shock}
          badgeLabel="ACCEL"
          badgeVariant="muted"
          subtitle="Ground reaction impact"
        />
      </View>

      {/* Workout Lifecycle Controls */}
      <View style={styles.controls}>
        {workoutState === 'idle' && (
          <Button
            title="Start Session"
            variant="primary"
            size="lg"
            onPress={() => setWorkoutState('active')}
            icon={<Ionicons name="play" size={20} color={colors.textInverse} />}
          />
        )}

        {workoutState === 'active' && (
          <View style={styles.actionRow}>
            <Button
              title="Pause"
              variant="secondary"
              size="lg"
              onPress={() => setWorkoutState('paused')}
              icon={<Ionicons name="pause" size={20} color={colors.textPrimary} />}
              style={styles.halfButton}
            />
            <Button
              title="Finish"
              variant="danger"
              size="lg"
              onPress={() => setWorkoutState('completed')}
              icon={<Ionicons name="stop" size={20} color={colors.textPrimary} />}
              style={styles.halfButton}
            />
          </View>
        )}

        {workoutState === 'paused' && (
          <View style={styles.actionRow}>
            <Button
              title="Resume"
              variant="primary"
              size="lg"
              onPress={() => setWorkoutState('active')}
              icon={<Ionicons name="play" size={20} color={colors.textInverse} />}
              style={styles.halfButton}
            />
            <Button
              title="Finish"
              variant="danger"
              size="lg"
              onPress={() => setWorkoutState('completed')}
              icon={<Ionicons name="stop" size={20} color={colors.textPrimary} />}
              style={styles.halfButton}
            />
          </View>
        )}

        {workoutState === 'completed' && (
          <Button
            title="Session Saved — Reset"
            variant="secondary"
            size="lg"
            onPress={() => setWorkoutState('idle')}
            icon={<Ionicons name="checkmark-circle" size={20} color={colors.recovery} />}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  activitySelector: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  activityButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  activityButton: {
    flex: 1,
  },
  timerCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: spacing.sm,
  },
  timerLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  timerValue: {
    fontSize: typography.sizes.hero + 8,
    fontWeight: typography.weights.heavy,
    fontFamily: typography.fontFamily.mono,
    color: colors.textPrimary,
    marginVertical: spacing.xxs,
  },
  qualityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  qualityText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  telemetryGrid: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  controls: {
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfButton: {
    flex: 1,
  },
});
