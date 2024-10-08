import React, { Fragment, ReactNode } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StyleSheet,
  StatusBar,
} from 'react-native';
import colors from 'utils/colors';
import { isIOS } from 'utils/helpers';

interface IContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  BGColor?: string;
  isShowHeader?: boolean;
  scrollable?: boolean;
  avoidKeyboard?: boolean;
  useDismissKeyboard?: boolean;
  renderHeader?: ReactNode;
  topSafeAreaColor?: string;
}

function Container({
  children,
  style,
  BGColor = colors.mainBlack,
  scrollable = false,
  isShowHeader = false,
  avoidKeyboard = true,
  useDismissKeyboard,
  renderHeader,
  topSafeAreaColor,
}: IContainerProps) {
  const renderContainer = () => {
    return (
      <TouchableWithoutFeedback
        disabled={!useDismissKeyboard}
        onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: BGColor }}>
          <StatusBar
            animated
            translucent={false}
            showHideTransition="fade"
            barStyle="light-content"
            backgroundColor={isShowHeader ? colors.white : colors.black[100]}
          />
          <SafeAreaView
            style={{
              backgroundColor: !topSafeAreaColor
                ? colors.backdrops[20]
                : topSafeAreaColor,
            }}
          />
          {renderHeader}

          {scrollable ? (
            <ScrollView
              bounces={false}
              overScrollMode="never"
              keyboardShouldPersistTaps="never"
              style={{ flex: 1, backgroundColor: BGColor || colors.white }}>
              <View style={[styles.container, style]}>{children}</View>
            </ScrollView>
          ) : (
            <>
              <View style={[styles.container, style]}>{children}</View>
              <SafeAreaView
                style={{ backgroundColor: BGColor || colors.white }}
              />
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Fragment>
      {isIOS && avoidKeyboard ? (
        <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
          {renderContainer()}
        </KeyboardAvoidingView>
      ) : (
        renderContainer()
      )}
    </Fragment>
  );
}

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
