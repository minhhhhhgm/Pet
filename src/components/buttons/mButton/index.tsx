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
  disabled?: boolean;
  label?: string;
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
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        primaryType && styles.primary,
        secondaryType && { backgroundColor: colors.blue[100], borderWidth: 0 },
        thirdType && { backgroundColor: colors.white, borderWidth: 0 },
        disabled && { backgroundColor: colors.gray[10], borderWidth: 0 },
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
          style={[
            primaryType && styles.textPrimary,
            thirdType && { color: colors.gray[100] },
            disabled && { color: colors.gray[30] },
            textStyle,
          ]}>
          {label}
        </MText>
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
    color: colors.white,
    fontSize: 16,
    fontFamily: 'SFPro-Bold',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
