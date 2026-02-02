import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';

import {
  FontSize,
  FontWeight,
  fontSizes,
  fontWeights,
} from '../designSystem/typography';

type WeightProps = {
  TextWeight: FontWeight;
};

export type AppTextProps = TextProps &
  WeightProps & {
    size?: FontSize;
  };

export function AppText({
  size = 'md',
  TextWeight = 'regular',
  style,
  ...rest
}: AppTextProps) {
  return (
    <RNText
      style={[
        styles.base,
        { fontSize: fontSizes[size], fontWeight: fontWeights[TextWeight] },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {},
});
