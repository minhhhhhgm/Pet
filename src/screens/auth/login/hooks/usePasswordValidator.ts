import { useEffect, useState } from 'react';
import { validatePassword } from 'utils/validations';

const usePasswordValidator = (password: string) => {
  const [isValid, setValid] = useState<boolean>(false);

  useEffect(() => {
    setValid(validatePassword(password));
  }, [password]);

  return isValid;
};

export default usePasswordValidator;
