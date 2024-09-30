import React from 'react';
import LoginContent from './components/LoginContent';
import useLogin from './hooks/useLogin';

const LoginScreen = () => {
  const {
    isValid,
    isValidPassword,
    email,
    password,
    onChangeEmail,
    onChangePassword,
    onPushResetPassword,
    onLogin,
  } = useLogin();

  return (
    <LoginContent
      email={email}
      onEmailChange={onChangeEmail}
      password={password}
      onPasswordChange={onChangePassword}
      onPushResetPassword={onPushResetPassword}
      isPasswordAndEmailValid={isValid && isValidPassword}
      onLogin={onLogin}
    />
  );
};

export default LoginScreen;
