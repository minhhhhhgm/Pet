import useStorage from 'hooks/useStorage';
import { navigate, navigateAndClearStack } from 'navigation/service';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useAppDispatch } from 'reduxStore';
import { setGlobalLoading } from 'reduxStore/slices/loadingSlice';
import { loginSuccess } from 'reduxStore/slices/loginSlice';
import useRequest from 'services';
import apiPaths from 'services/apiPaths';
import screenNames from 'utils/constants/screenNames';
import useEmailValidator from './useEmailValidator';
import usePasswordValidator from './usePasswordValidator';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';

export enum Step {
  EMAIL,
  PASSWORD,
}

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(Step.EMAIL);
  const [enable, setEnable] = useState(false);

  const isValid = useEmailValidator(email);
  const isValidPassword = usePasswordValidator(password);

  const { postRequest,  getRequest } = useRequest();
  const dispatch = useAppDispatch();
  const { saveLogInData } = useStorage();

  const onChangeEmail = (text?: string) => {
    setEmail(text ?? '');
  };

  const onChangePassword = (text?: string) => {
    setPassword(text ?? '');
  };



  const onChangeStep = async() => {
    if(step === Step.EMAIL){
      setStep(Step.PASSWORD)
    }
    else{
      dispatch(setGlobalLoading(true))
      try {
        // const user = await auth().createUserWithEmailAndPassword(
        //   email,
        //   password,
        // );
        // console.log(user.user);
        
        const data = await getRequest('home/homeApi')
        console.log(data);
        
        
      } catch (error) {
        console.log('Error during phone sign-in:', error);
      }finally{
        dispatch(setGlobalLoading(false))
      }
    }

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
    onLogin,
    step,
    onChangeStep,
    enable,
  };
};

export default useLogin;
