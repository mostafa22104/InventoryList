export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
} as const;

export type FontSize = keyof typeof fontSizes;

export const fontWeights = {
  regular: '400',
  semibold: '600',
  bold: '700',
} as const;

export type FontWeight = keyof typeof fontWeights;
