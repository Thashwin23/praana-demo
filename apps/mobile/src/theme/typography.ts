import { Platform, TextStyle } from 'react-native';

export const typography = {
  fontFamily: {
    sans: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    mono: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
  },
  sizes: {
    hero: 44,       // Primary live metric values (e.g., 168 BPM)
    xxl: 32,        // Large timers & score headers
    xl: 24,         // Screen titles & zone indicators
    lg: 20,         // Section headers & modal titles
    md: 16,         // Primary body text & list items
    sm: 14,         // Secondary descriptions & labels
    xs: 12,         // Badges, units, and timestamps
    xxs: 10,        // Micro labels and captions
  },
  weights: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
    heavy: '800' as TextStyle['fontWeight'],
  },
} as const;
