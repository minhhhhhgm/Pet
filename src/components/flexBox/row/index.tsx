import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

const Row = ({
  gap,
  children,
  style,
  ...props
}: { gap?: number; children?: ReactNode } & ViewProps) => {
  return (
    <View style={[{ flexDirection: 'row', gap }, style]} {...props}>
      {children}
    </View>
  );
};

export default Row;
