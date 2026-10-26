import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Button, Badge } from '@/components';
import { colors, typography, spacing, radius } from '@/theme';

export default function MetricInfoModal() {
  const router = useRouter();

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Physiological Foundations</Text>
          <Badge label="THEORY" variant="cyan" />
        </View>
        <Button
          title="Done"
          variant="secondary"
          size="sm"
          onPress={() => router.back()}
        />
      </View>

      {/* Concept 1: Respiration vs Heart Rate */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="fitness-outline" size={20} color={colors.respiration} />
          <Text style={styles.sectionTitle}>1. Respiration as a Leading Metric</Text>
        </View>
        <Text style={styles.paragraph}>
          Heart rate lags muscular effort by up to 45 seconds due to circulatory transit time and autonomic delay. In contrast, breathing rate increases within 1–3 seconds of metabolic demand, providing the earliest warning of systemic fatigue.
        </Text>
      </View>

      {/* Concept 2: VT1 & VT2 Thresholds */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="trending-up-outline" size={20} color={colors.warning} />
          <Text style={styles.sectionTitle}>2. Ventilatory Thresholds (VT1 & VT2)</Text>
        </View>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>VT1 (Aerobic Threshold):</Text> Lactate begins rising above baseline. Breathing depth increases, but speech remains possible. Effort is sustainable for hours.
        </Text>
        <Text style={[styles.paragraph, { marginTop: spacing.xs }]}>
          <Text style={styles.bold}>VT2 (Anaerobic / Compensation):</Text> Blood acidosis accelerates. Hyperventilation occurs to blow off CO₂. Effort is sustainable for only a few minutes.
        </Text>
      </View>

      {/* Concept 3: Signal Quality & Gaps */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.recovery} />
          <Text style={styles.sectionTitle}>3. Signal Quality Index (SQI)</Text>
        </View>
        <Text style={styles.paragraph}>
          Physical electrodes can lose contact during intense movement. PRAANA evaluates every sample for signal validity. Missing samples are represented as gaps, never converted to false zeros.
        </Text>
      </View>

      <Button
        title="Close"
        variant="primary"
        size="md"
        onPress={() => router.back()}
        style={styles.closeBtn}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  paragraph: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  bold: {
    fontWeight: typography.weights.bold,
    color: colors.respiration,
  },
  closeBtn: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
