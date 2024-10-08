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
    onLogin,
    step,
    onChangeStep,
    enable,
  } = useLogin();

  return (
    <LoginContent
      email={email}
      onEmailChange={onChangeEmail}
      password={password}
      onPasswordChange={onChangePassword}
      isPasswordAndEmailValid={isValid && isValidPassword}
      onLogin={onLogin}
      step={step}
      ocStepChange={onChangeStep}
      enable={enable}
      isValid={isValid}
      isValidPassword={isValidPassword}
    />
  );
};

export default LoginScreen;
