import useStorage from 'hooks/useStorage';
import { navigate, navigateAndClearStack } from 'navigation/service';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import { useAppDispatch } from 'reduxStore';
import { setGlobalLoading } from 'reduxStore/slices/loadingSlice';
import { loginSuccess } from 'reduxStore/slices/loginSlice';
import useRequest from 'services';
import apiPaths from 'services/apiPaths';
import screenNames from 'utils/constants/screenNames';
import useEmailValidator from './useEmailValidator';
import usePasswordValidator from './usePasswordValidator';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isValid = useEmailValidator(email);
  const isValidPassword = usePasswordValidator(password);
  const { postRequest } = useRequest();
  const dispatch = useAppDispatch();
  const { saveLogInData } = useStorage();

  const onChangeEmail = (text?: string) => {
    setEmail(text ?? '');
  };

  const onChangePassword = (text?: string) => {
    setPassword(text ?? '');
  };

  const onPushResetPassword = () => {
    navigate(screenNames.RESET_PASSWORD_SCREEN);
  };

  const onLogin = async () => {
    try {
      // Keyboard.dismiss();
      // if (isValid && isValidPassword) {
      //   dispatch(setGlobalLoading(true));
      //   const data = {
      //     email,
      //     password,
      //     token_abilities: [],
      //   };
      //   const res = await postRequest(apiPaths.login, data);
      //   if (res && res.token) {
      //     dispatch(loginSuccess(res));
      //     saveLogInData(res);
      //     navigateAndClearStack(screenNames.MAIN_TAB);
      //   }
      // }
    } catch (error: any) {
      if (error && error.error && error.error.email) {
      }
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };

  return {
    email,
    password,
    isValid,
    isValidPassword,
    onChangeEmail,
    onChangePassword,
    onPushResetPassword,
    onLogin,
  };
};

export default useLogin;
