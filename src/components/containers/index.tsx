import React, { Fragment } from 'react';
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
import HeaderView from './containerHeader';

interface IContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  BGColor?: string;
  title?: string;
  showBackButton?: boolean;
  showBackButtonIcon?: boolean;
  backButtonTitle?: string;
  isShowHeader?: boolean;
  scrollable?: boolean;
  avoidKeyboard?: boolean;
  useDismissKeyboard?: boolean;
  secondBackButtonTitle?: boolean;
  onBack?(): void;
}

function Container({
  children,
  style,
  BGColor = colors.gray[70],
  scrollable = false,
  title = '',
  showBackButton = false,
  showBackButtonIcon = false,
  backButtonTitle = "translate('navigationBar.backButtonTitle')",
  isShowHeader = false,
  avoidKeyboard = true,
  useDismissKeyboard,
  secondBackButtonTitle,
  onBack,
}: IContainerProps) {
  const renderHeader = () => {
    return (
      <HeaderView
        title={title}
        showBackButton={showBackButton}
        showBackButtonIcon={showBackButtonIcon}
        backButtonTitle={backButtonTitle}
        secondBackButtonTitle={secondBackButtonTitle}
        onBack={onBack}
      />
    );
  };

  const renderContainer = () => {
    return (
      <TouchableWithoutFeedback disabled={!useDismissKeyboard} onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: BGColor }}>
          <StatusBar
            animated
            translucent={false}
            showHideTransition="fade"
            barStyle="dark-content"
            backgroundColor={isShowHeader ? colors.white : colors.gray[10]}
          />
          {isShowHeader ? (
            renderHeader()
          ) : (
            <SafeAreaView style={{ backgroundColor: colors.gray[80] }} />
          )}

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
              <SafeAreaView style={{ backgroundColor: BGColor || colors.white }} />
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
