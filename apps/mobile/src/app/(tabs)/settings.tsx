import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Header, Button } from '@/components';
import { colors, typography, spacing, radius } from '@/theme';

export default function SettingsScreen() {
  const [offlineOnly, setOfflineOnly] = useState(false);
  const [highSampleRate, setHighSampleRate] = useState(false);

  return (
    <Screen scrollable>
      <Header
        title="SETTINGS"
        subtitle="Athlete Profile & Data Privacy"
      />

      {/* Profile Section */}
      <Text style={styles.sectionTitle}>ATHLETE PROFILE</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Resting Heart Rate</Text>
          <Text style={styles.value}>52 BPM</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Max Heart Rate (Measured)</Text>
          <Text style={styles.value}>192 BPM</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Age / Weight</Text>
          <Text style={styles.value}>28 yrs / 72 kg</Text>
        </View>
      </View>

      {/* Data Controls */}
      <Text style={styles.sectionTitle}>PRIVACY & SYNC CONTROLS</Text>
      <View style={styles.card}>
        <View style={styles.switchRow}>
          <View style={styles.switchText}>
            <Text style={styles.label}>Local Offline-Only Mode</Text>
            <Text style={styles.sublabel}>Do not sync telemetry to cloud backend</Text>
          </View>
          <Switch
            value={offlineOnly}
            onValueChange={setOfflineOnly}
            trackColor={{ false: colors.border, true: colors.respiration }}
            thumbColor={colors.textPrimary}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.switchRow}>
          <View style={styles.switchText}>
            <Text style={styles.label}>Raw Waveform Recording</Text>
            <Text style={styles.sublabel}>Save high-frequency 250Hz ECG locally</Text>
          </View>
          <Switch
            value={highSampleRate}
            onValueChange={setHighSampleRate}
            trackColor={{ false: colors.border, true: colors.respiration }}
            thumbColor={colors.textPrimary}
          />
        </View>
      </View>

      {/* Data Export / Ownership */}
      <Text style={styles.sectionTitle}>DATA OWNERSHIP</Text>
      <View style={styles.card}>
        <Button
          title="Export All Workout Sessions (JSON)"
          variant="secondary"
          size="md"
          onPress={() => {}}
          icon={<Ionicons name="download-outline" size={18} color={colors.textPrimary} />}
          style={styles.exportButton}
        />
        <Button
          title="Clear Local Cache"
          variant="ghost"
          size="sm"
          onPress={() => {}}
        />
      </View>

      <Text style={styles.versionText}>
        PRAANA Mobile v1.0.0-alpha • Phase 2 Setup
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  switchText: {
    flex: 1,
    marginRight: spacing.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  sublabel: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  value: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    fontFamily: typography.fontFamily.mono,
    color: colors.respiration,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: spacing.xs,
  },
  exportButton: {
    marginBottom: spacing.xs,
  },
  versionText: {
    textAlign: 'center',
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
});
