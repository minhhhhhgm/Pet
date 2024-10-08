import React, { ReactElement, ReactNode, useRef } from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'utils/colors';

export interface TextFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  RightIcon?: ReactNode;
  LeftIcon?: ReactNode;
}
const TextField = (props: TextFieldProps) => {
  const {
    label,
    placeholder,
    RightIcon,
    LeftIcon,
    style,
    containerStyle,
    inputWrapperStyle,
    ...TextInputProps
  } = props;
  const input = useRef<TextInput>(null);
  function focusInput() {
    input.current?.focus();
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={containerStyle}
      onPress={focusInput}>
      <View style={[inputWrapperStyleRoot, inputWrapperStyle]}>
        {LeftIcon && LeftIcon}
        <TextInput
          {...TextInputProps}
          ref={input}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          style={[inputStyle, style]}
          // cursorColor="orange"
        />
      </View>
    </TouchableOpacity>
  );
};

export default TextField;

const inputWrapperStyleRoot: ViewStyle = {
  flexDirection: 'row',
  borderRadius: 16,
  backgroundColor: '#222222',
  minHeight: 55,
  alignSelf: 'stretch',
};

const inputStyle: TextStyle = {
  fontSize: 21,
  paddingHorizontal: 16,
  color: colors.white,
  flex: 1,
};
