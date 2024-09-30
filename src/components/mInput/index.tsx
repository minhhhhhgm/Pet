import MText from 'components/text';
import React, { useState } from 'react';
import { StyleSheet, TextInputProps, TextInput as TextInputRN, View } from 'react-native';
import colors from 'utils/colors';
// import { useAppTranslation } from 'utils/languages';

interface MInputProps extends TextInputProps {
  label: string;
  isRequired?: boolean;
  secondaryRequiredType?: boolean;
}

function MTextInput(props: MInputProps) {
  const { label, isRequired = false, secondaryRequiredType = false } = props;

  const [isFocused, setFocused] = useState(false);
  // const translate = useAppTranslation('common');
  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowLabel}>
        <MText fontSize={14}>{label}</MText>
        {isRequired && (
          <>
            {!secondaryRequiredType && (
              <MText
                fontSize={14}
                fontWeight="700"
                color={colors.pink[10]}
                style={styles.textFieldRequired}>
                {"pd"}
              </MText>
            )}
            {secondaryRequiredType && (
              <View style={styles.viewSecondary}>
                <MText fontWeight="700" color={colors.white}>
                  {"llsdl"}
                </MText>
              </View>
            )}
          </>
        )}
      </View>
      <TextInputRN
        {...props}
        style={[styles.inputContainer, isFocused && { borderColor: colors.blue[100] }]}
        placeholderTextColor={colors.gray[20]}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
}

export default MTextInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  textFieldRequired: {
    marginLeft: 8,
  },
  viewSecondary: {
    backgroundColor: colors.yellow[10],
    paddingTop: 2,
    paddingBottom: 3,
    paddingHorizontal: 7,
    marginLeft: 8,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    fontSize: 14,
    borderColor: colors.gray[60],
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: colors.white,
    height: 53,
    padding: 16,
    color: colors.black[90],
  },
  rowLabel: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
});
