import React from 'react';
import ResetPasswordContent from './components/ResetPasswordContent';
import useResetPassword from './hooks/useResetPassword';
const ResetPasswordScreen = () => {
  const { isValid, email, emailConfirm, onChangeEmailConfirm, onChangeEmail, onSend } =
    useResetPassword();

  return (
    <ResetPasswordContent
      isValid={isValid}
      email={email}
      onEmailChange={onChangeEmail}
      emailConfirm={emailConfirm}
      onEmailConfirmChange={onChangeEmailConfirm}
      onSend={onSend}
    />
  );
};

export default ResetPasswordScreen;
