import { useEffect, useState } from 'react';
import { validateEmail } from 'utils/validations';

const useEmailConfirmValidator = (email: string, emailConfirm: string) => {
  const [isValidEmailConfirm, setValid] = useState<boolean>(false);
  useEffect(() => {
    const isValid = validateEmail(emailConfirm);
    if (isValid && emailConfirm === email) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, emailConfirm]);
  return isValidEmailConfirm;
};

export default useEmailConfirmValidator;
