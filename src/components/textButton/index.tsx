import SizeBox from 'components/sizeBox';
import MText from 'components/text';
import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface TextButtonProps {
  text: string;
  icon?: ReactNode;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  fontSizeText?: number;
  isBoldText?: boolean;
  colorText?: string;
  containerButtonStyle?: StyleProp<ViewStyle>;
  spacing?: number;
  disabled?: boolean;
}

const TextButton = (props: TextButtonProps) => {
  const {
    icon,
    text,
    onPress,
    textStyle,
    containerButtonStyle,
    spacing = 8,
    fontSizeText = 14,
    isBoldText = false,
    colorText,
    disabled,
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, containerButtonStyle]}
      onPress={onPress}>
      {icon && (
        <>
          {icon}
          <SizeBox width={spacing} />
        </>
      )}
      <MText
        {...(isBoldText && { fontWeight: '700' })}
        fontSize={fontSizeText}
        color={colorText}
        style={[textStyle]}>
        {text}
      </MText>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
