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
    onBack,
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
      onBack={onBack}
    />
  );
};

export default LoginScreen;
