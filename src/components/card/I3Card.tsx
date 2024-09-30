import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type I3CardProps = {
  children: React.ReactNode;
  padding?: number;
  round?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

function I3Card({ children, style, padding = 16, round = 16, color = '#fff' }: I3CardProps) {
  return (
    <View style={[style, { padding, borderRadius: round, backgroundColor: color }]}>
      {children}
    </View>
  );
}

export default I3Card;
