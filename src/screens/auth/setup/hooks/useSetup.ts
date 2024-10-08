import { navigate } from 'navigation/service';
import screenNames from 'utils/constants/screenNames';

const useSetup = () => {
  const onSetup = () => {
    navigate(screenNames.LOGIN_SCREEN);
  };

  return {
    onSetup,
  };
};
export default useSetup;
