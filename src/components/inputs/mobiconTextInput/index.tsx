import MText from 'components/text';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from 'utils/colors';

export interface MBCTextInput extends TextInputProps {
  label?: string;
}

function MBCTextInput(props: MBCTextInput) {
  const { label } = props;

  const [isFocused, setFocused] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  return (
    <View style={styles.container}>
      <MText style={styles.textFieldLabel}>{label}</MText>
      <View>
        {isFocused && (
          <View
            style={[
              styles.focusBorder,
              !!size.width &&
                !!size.height && { width: size.width, height: size.height },
            ]}
          />
        )}
        <TextInput
          {...props}
          onLayout={event => {
            const { width, height } = event.nativeEvent.layout;
            setSize({ width: width + 4, height: height + 4 });
          }}
          style={styles.inputContainer}
          placeholderTextColor={colors.gray[20]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}

export default MBCTextInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  textFieldLabel: {
    paddingBottom: 8,
  },
  inputContainer: {
    borderColor: colors.gray[20],
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    minHeight: 53,
    paddingHorizontal: 16,
    padding: 0,
    margin: 0,
  },
  focusBorder: {
    backgroundColor: colors.primary,
    position: 'absolute',
    top: -2,
    left: -2,
    borderRadius: 4,
  },
});
