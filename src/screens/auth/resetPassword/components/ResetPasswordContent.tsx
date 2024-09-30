import { Container, SizeBox, MText, MButton, Header, MTextInput } from 'components';
import { goBack } from 'navigation/service';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HeaderButtonType } from 'types/header.type';
import colors from 'utils/colors';
import { useAppTranslation } from 'utils/languages';

type ResetPasswordContentProps = {
  email?: string;
  onEmailChange?: (text?: string) => void;
  emailConfirm?: string;
  onEmailConfirmChange?: (text?: string) => void;
  isValid?: boolean;
  onSend: () => void;
};

function ResetPasswordContent(props: ResetPasswordContentProps) {
  const { email, onEmailChange, emailConfirm, onEmailConfirmChange, isValid, onSend } = props;

  const translate = useAppTranslation('resetPassword');
  return (
    <Container useDismissKeyboard>
      <Header
        style={styles.header}
        title={translate('resetPassword:resetPassword')}
        headerLeftType={HeaderButtonType.Back}
        leftOnPress={goBack}
      />
      <View style={styles.contentContainer}>
        <SizeBox height={24} />
        <MText style={styles.text} fontSize={14}>
          {translate('resetPassword:enterEmail')}
        </MText>
        <SizeBox height={24} />
        <MText style={styles.text} fontSize={14}>
          {translate('resetPassword:checkSpam')}
        </MText>
        <SizeBox height={16} />
        <MTextInput
          value={email}
          onChangeText={onEmailChange}
          label={translate('resetPassword:emailAddress')}
        />
        <SizeBox height={16} />
        <MTextInput
          value={emailConfirm}
          onChangeText={onEmailConfirmChange}
          label={translate('resetPassword:confirmEmailAddress')}
        />
        <SizeBox height={40} />
        <MButton disabled={!isValid} label={translate('resetPassword:send')} onPress={onSend} />
      </View>
    </Container>
  );
}

export default ResetPasswordContent;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'justify',
  },
  header: {
    backgroundColor: colors.gray[80],
    borderBottomWidth: 1,
    borderBottomColor: colors.black[50],
  },
});
