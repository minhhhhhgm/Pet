import { useEffect, useState } from 'react';
import { validatePassword } from 'utils/validations';

const usePasswordValidator = (password: string) => {
  const [isValid, setValid] = useState<boolean>(false);

  useEffect(() => {
    if (password.length >= 6) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [password]);

  return isValid;
};

export default usePasswordValidator;
