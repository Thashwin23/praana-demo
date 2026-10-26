export const colors = {
  // Backgrounds
  background: '#090D16',       // Deepest obsidian background
  card: '#121826',             // Card / container surface
  cardElevated: '#182133',     // Elevated / hover surface
  cardSubtle: '#0F1420',       // Sunken / background element

  // Borders & Dividers
  border: '#1F2A40',           // Standard subtle border
  borderSubtle: '#161F30',     // Very faint separator
  borderActive: '#00E5FF',     // Focused / active border

  // Physiological Metrics & Visual Indicators
  respiration: '#00E5FF',      // Electric Cyan: Breathing, Lungs, VT1
  heartRate: '#FF3366',        // Crimson Coral: Heart Rate, Cardio Strain
  hrv: '#A855F7',              // Neon Purple: Heart Rate Variability, Autonomic Tone
  recovery: '#00E676',         // Neon Jade: Optimal Recovery, Green Zone
  warning: '#FFB020',          // Electric Amber: Degraded Signal, High Strain, VT2
  error: '#EF4444',            // Crimson Red: Disconnected, Lead-off, Invalid
  cadence: '#F59E0B',          // Warm Amber: Steps / RPM
  shock: '#EC4899',            // Magenta: G-Force Impact Shock

  // Text Hierarchy
  textPrimary: '#F8FAFC',      // 100% white-slate for primary headers & live values
  textSecondary: '#94A3B8',    // 60% slate for labels & units
  textMuted: '#64748B',        // 40% slate for timestamps & disclaimers
  textInverse: '#090D16',      // Inverted text on bright buttons

  // Accents & Brand
  primary: '#00E5FF',          // Primary action (Electric Cyan)
  primaryHover: '#33EBFF',
  primaryMuted: 'rgba(0, 229, 255, 0.12)',
  heartRateMuted: 'rgba(255, 51, 102, 0.12)',
  recoveryMuted: 'rgba(0, 230, 118, 0.12)',
  warningMuted: 'rgba(255, 176, 32, 0.12)',
  errorMuted: 'rgba(239, 68, 68, 0.12)',
} as const;

export type ThemeColors = typeof colors;
