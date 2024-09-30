import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigateAndClearStack } from 'navigation/service';
import { useDispatch } from 'react-redux';
import { clearLoginData } from 'reduxStore/slices/loginSlice';
import { clearProfileData } from 'reduxStore/slices/profileSlice';
import screenNames from 'utils/constants/screenNames';

const REFRESH_TOKEN = 'REFRESH_TOKEN';
const USER_DATA = 'USER_DATA';
const LOGIN_DATA = 'LOGIN_DATA';

const saveUserStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const getUserStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (error) {
    return false;
  }
};

function useStorage() {
  const dispatch = useDispatch();
  const clearUserStorage = async () => {
    try {
      await AsyncStorage.removeItem(LOGIN_DATA);
      await AsyncStorage.removeItem(USER_DATA);
      await AsyncStorage.removeItem(REFRESH_TOKEN);
      return true;
    } catch (error) {
      return false;
    }
  };

  const saveLogInData = async (value: any) => {
    saveUserStorage(LOGIN_DATA, JSON.stringify(value));
  };

  const getLogInData = async () => {
    const result = await getUserStorage(LOGIN_DATA);
    return result;
  };

  const logout = async () => {
    clearUserStorage();
    dispatch(clearLoginData());
    dispatch(clearProfileData());
    navigateAndClearStack(screenNames.LOGIN_SCREEN);
  };

  return {
    clearUserStorage,
    logout,
    saveLogInData,
    getLogInData,
  };
}

export default useStorage;
