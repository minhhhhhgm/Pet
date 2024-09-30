import { Container, SizeBox, MButton, Header, MTextInput, TextButton } from 'components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
// import { isTablet } from 'react-native-device-info';
import colors from 'utils/colors';
// import { QuestionMarkIcon } from 'utils/icons';
// import { useAppTranslation } from 'utils/languages';

type LoginContentProps = {
  email?: string;
  onEmailChange?: (text?: string) => void;
  password?: string;
  onPasswordChange?: (text?: string) => void;
  onPushResetPassword?: () => void;
  isPasswordAndEmailValid?: boolean;
  onLogin: () => void;
};

function LoginContent(props: LoginContentProps) {
  const {
    email,
    password,
    isPasswordAndEmailValid,
    onEmailChange,
    onPasswordChange,
    onPushResetPassword,
    onLogin,
  } = props;

  // const translate = useAppTranslation('login');
  return (
    <Container useDismissKeyboard avoidKeyboard={false}>
      <MTextInput
        value={email}
        onChangeText={onEmailChange}
        isRequired
        label={'kkk'}
      />
      {/* <Header style={styles.header} title={translate('login:login')} />
      <View style={styles.body}>
        <SizeBox height={24} />
        <MTextInput
          value={email}
          onChangeText={onEmailChange}
          isRequired
          label={translate('login:emailAddress')}
        />
        <SizeBox height={16} />
        <MTextInput
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry
          isRequired
          label={translate('login:password')}
        />
        <SizeBox height={26} />
        <TextButton
          icon={<QuestionMarkIcon />}
          text={translate('login:forgotPassword')}
          onPress={onPushResetPassword!}
        />
        <SizeBox height={50} />
        <MButton
          disabled={!isPasswordAndEmailValid}
          label={translate('login:next')}
          onPress={onLogin}
        />
      </View> */}
    </Container>
  );
}

export default LoginContent;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  header: {
    backgroundColor: colors.gray[80],
    borderBottomWidth: 1,
    borderBottomColor: colors.black[50],
  },
});
