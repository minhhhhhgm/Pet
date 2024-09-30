import { useNavigation } from '@react-navigation/native';
import useStorage from 'hooks/useStorage';
import React, { useEffect } from 'react';
// import BootSplash from 'react-native-bootsplash';
import { useAppDispatch } from 'reduxStore';
import { loginSuccess } from 'reduxStore/slices/loginSlice';
import screenNames from 'utils/constants/screenNames';

const LoadingScreen = () => {
  const navigate = useNavigation<any>();
  const { getLogInData } = useStorage();
  const dispatch = useAppDispatch();

  const gotoScreen = (screen: string) => {
    navigate.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  };

  useEffect(() => {
    const init = async () => {
      const auth = await getLogInData();
      if (auth && auth.token) {
        dispatch(loginSuccess(auth));
        gotoScreen(screenNames.MAIN_TAB);
      } else {
        gotoScreen(screenNames.LOGIN_SCREEN);
      }
    };

    init().finally(async () => {
      // await BootSplash.hide({ fade: true });
    });
  });

  return <></>;
};

export default LoadingScreen;
