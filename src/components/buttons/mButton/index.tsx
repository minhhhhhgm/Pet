import { MText } from 'components';
import SizeBox from 'components/sizeBox';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import colors from 'utils/colors';

export interface CommonRoundedButtonProps extends TouchableOpacityProps {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  disabled?: boolean;
  label?: string;
  isBoldLabel?: boolean;
  primaryType?: boolean;
  secondaryType?: boolean;
  textStyle?: StyleProp<TextStyle>;
  thirdType?: boolean;
  onPress(): void;
}

function MButton(props: CommonRoundedButtonProps) {
  const {
    icon,
    disabled,
    label,
    primaryType = true,
    secondaryType,
    thirdType,
    style,
    textStyle,
    onPress,
    isBoldLabel,
    rightIcon,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        primaryType && styles.primary,
        secondaryType && { backgroundColor: colors.blue[100], borderWidth: 0 },
        thirdType && { backgroundColor: colors.white, borderWidth: 0 },
        disabled && { backgroundColor: colors.gray[24], borderWidth: 0 },
        style,
      ]}>
      <View style={styles.titleWrapper}>
        {icon && (
          <>
            {icon}
            <SizeBox width={8} />
          </>
        )}
        <MText
          fontSize={20}
          {...(isBoldLabel && { fontWeight: '700' })}
          style={[
            primaryType && styles.textPrimary,
            thirdType && { color: colors.gray[100] },
            disabled && { color: colors.gray[30] },
            textStyle,
          ]}>
          {label}
        </MText>
        {rightIcon && (
          <>
            <SizeBox width={8} />
            {rightIcon}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default MButton;

const styles = StyleSheet.create({
  primary: {
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 56,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  textPrimary: {
    color: '#261A03',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
