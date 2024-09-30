import SizeBox from 'components/sizeBox';
import MText from 'components/text';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import colors from 'utils/colors';
import { CheckBoxSelectedIcon, CheckBoxUnSelectedIcon } from 'utils/icons';

interface CheckBoxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  isGrayBackground?: boolean;
  isBoldLabel?: boolean;
  checkBoxContainerStyle?: StyleProp<ViewStyle>;
}

const CheckBox = (props: CheckBoxProps) => {
  const {
    value = false,
    onValueChange,
    label,
    isGrayBackground,
    isBoldLabel = false,
    checkBoxContainerStyle,
  } = props;
  return (
    <View
      style={[
        styles.container,
        isGrayBackground && { backgroundColor: colors.gray[50], padding: 8, borderRadius: 8 },
        checkBoxContainerStyle,
      ]}>
      <Pressable style={styles.checkBox} onPress={() => onValueChange(!value)}>
        {value ? <CheckBoxSelectedIcon /> : <CheckBoxUnSelectedIcon />}
        <SizeBox width={8} />
        <MText {...(isBoldLabel && { fontWeight: '700' })} fontSize={14}>
          {label}
        </MText>
      </Pressable>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
