import useStorage from 'hooks/useStorage';
import { useAppRoute } from 'navigation';
import { navigate } from 'navigation/service';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'reduxStore';
import { setGlobalLoading } from 'reduxStore/slices/loadingSlice';
import useRequest from 'services';
import screenNames from 'utils/constants/screenNames';

type ParamsCreate = {
  email: string;
  password: string;
  name: string;
};

type ParamsLogin = {
  email: string;
  password: string;
};

const useSetup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const { postRequest } = useRequest();
  const { saveLogInData } = useStorage();

  const dispatch = useAppDispatch();
  const { params } = useAppRoute();

  useEffect(() => {
    if (firstName && lastName) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }, [firstName, lastName]);

  const onChangeFirstName = (v: string) => {
    setFirstName(v);
  };

  const onChangeLastName = (v: string) => {
    setLastName(v);
  };

  const onSetup = () => {
    navigate(screenNames.LOGIN_SCREEN);
  };

  const onLogin = async () => {
    try {
      dispatch(setGlobalLoading(true));

      const data: ParamsCreate = {
        email: params.email,
        password: params.password,
        name: firstName + lastName,
      };
      const res = await postRequest<ParamsCreate, any>('api/createUsers', data);
      if (res) {
        console.log(res);
        const data: ParamsLogin = {
          email: params.email,
          password: params.password,
        };
        const resLogin = await postRequest<ParamsLogin, any>('api/login', data);
        if (resLogin) {
          saveLogInData(resLogin);
          navigate(screenNames.MAIN_CAM);
        }
      }
    } catch (error) {
      console.log('error');
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };

  return {
    onSetup,
    firstName,
    lastName,
    onChangeFirstName,
    onChangeLastName,
    isValidName,
    onLogin,
  };
};
export default useSetup;
