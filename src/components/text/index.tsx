import React from 'react';
import { Text, TextProps } from 'react-native';
import colors from 'utils/colors';

const MText = ({
  fontSize = 12,
  color = colors.black[90],
  fontWeight = '400',
  style,
  children,
  ...props
}: { fontSize?: number; color?: string; fontWeight?: '400' | '700' } & TextProps) => {
  return (
    <Text
      style={[
        {
          fontFamily: fontWeight === '400' ? 'SFPro-Regular' : 'SFPro-Bold',
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
