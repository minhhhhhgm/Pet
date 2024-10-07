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
  placeholder?: any;
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
    value,
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
          ref={input}
          underlineColorAndroid={'transparent'}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          style={[inputStyle, style]}
          value={value}
          cursorColor="orange"
          selectionColor="orange"
          {...TextInputProps}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TextField;

const inputWrapperStyleRoot: ViewStyle = {
  flexDirection: 'row',
  // borderWidth: 1,
  borderColor: '#909090',
  borderRadius: 16,
  backgroundColor: '#222222',
  minHeight: 55,
};

const inputStyle: TextStyle = {
  fontSize: 21,
  paddingHorizontal: 16,
  color: colors.white,
  flex: 1,
};
