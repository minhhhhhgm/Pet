import React from 'react';
import { Text, TextProps } from 'react-native';
import colors from 'utils/colors';
import { isIOS } from 'utils/helpers';

const MText = ({
  fontSize = 14,
  color = colors.white,
  fontWeight = '400',
  style,
  children,
  ...props
}: {
  fontSize?: number;
  color?: string;
  fontWeight?: '400' | '700';
} & TextProps) => {
  const iosFont = fontWeight === '400' ? 'SFPro-Regular' : 'SFPro-Bold';
  const androidFont = fontWeight === '400' ? 'Roboto-Regular' : 'Roboto-Bold';
  const fontFamily = isIOS ? iosFont : androidFont;
  return (
    <Text
      style={[
        {
          fontFamily: fontFamily,
          color,
          fontSize,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default MText;
