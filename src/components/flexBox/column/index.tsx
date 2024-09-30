import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

const Column = ({
  gap,
  children,
  style,
  ...props
}: { gap?: number; children?: ReactNode } & ViewProps) => {
  return (
    <View style={[{ flexDirection: 'column', gap }, style]} {...props}>
      {children}
    </View>
  );
};

export default Column;
