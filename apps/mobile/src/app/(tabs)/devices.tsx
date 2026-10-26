import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Header, Button, Badge } from '@/components';
import { colors, typography, spacing, radius } from '@/theme';

export default function DevicesScreen() {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 2500);
  };

  return (
    <Screen scrollable>
      <Header
        title="DEVICES"
        subtitle="Sensor Management & BLE Status"
        rightElement={<Badge label="1 CONNECTED" variant="jade" dot />}
      />

      {/* Connected Active Sensor */}
      <Text style={styles.sectionTitle}>ACTIVE SENSOR PROVIDER</Text>
      <View style={styles.deviceCard}>
        <View style={styles.deviceHeader}>
          <View style={styles.deviceInfo}>
            <View style={styles.iconCircle}>
              <Ionicons name="hardware-chip-outline" size={24} color={colors.respiration} />
            </View>
            <View>
              <Text style={styles.deviceName}>PRAANA Mock Engine</Text>
              <Text style={styles.deviceId}>ID: mock-sensor-engine-v1</Text>
            </View>
          </View>
          <Badge label="ACTIVE" variant="cyan" />
        </View>

        <View style={styles.specsGrid}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>SIGNAL QUALITY</Text>
            <Text style={[styles.specValue, { color: colors.recovery }]}>100% (STABLE)</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>BATTERY</Text>
            <Text style={styles.specValue}>94% (SIMULATED)</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>CHANNELS</Text>
            <Text style={styles.specValue}>ECG, RESP, IMU</Text>
          </View>
        </View>
      </View>

      {/* BLE Scanning Action */}
      <View style={styles.scanSection}>
        <Button
          title={scanning ? 'Scanning for BLE Peripherals...' : 'Scan for Physical Hardware'}
          variant="secondary"
          size="md"
          loading={scanning}
          onPress={handleScan}
          icon={<Ionicons name="bluetooth" size={18} color={colors.textPrimary} />}
        />
      </View>

      {/* Hardware Integration Notice */}
      <View style={styles.noticeCard}>
        <View style={styles.noticeHeader}>
          <Ionicons name="alert-circle-outline" size={20} color={colors.warning} />
          <Text style={styles.noticeTitle}>Hardware Specifications Status</Text>
        </View>
        <Text style={styles.noticeText}>
          Physical BLE integration is decoupled via <Text style={styles.codeText}>ISensorProvider</Text>. Device-specific GATT services, packet parsing, and MTU negotiation will be implemented in Phase 8 once the questionnaire in <Text style={styles.codeText}>docs/HARDWARE_QUESTIONNAIRE.md</Text> is answered by the firmware team.
        </Text>
      </View>
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
  deviceCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  deviceId: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  specsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.cardSubtle,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  specItem: {
    alignItems: 'center',
  },
  specLabel: {
    fontSize: typography.sizes.xxs,
    fontWeight: typography.weights.bold,
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  specValue: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  scanSection: {
    marginBottom: spacing.lg,
  },
  noticeCard: {
    backgroundColor: colors.cardSubtle,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  noticeTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.warning,
  },
  noticeText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  codeText: {
    fontFamily: typography.fontFamily.mono,
    color: colors.respiration,
  },
});
