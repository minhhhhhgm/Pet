import { useEffect, useState } from 'react';
import { validateEmail } from 'utils/validations';

const useEmailValidator = (email: string) => {
  const [isValidEmail, setValid] = useState<boolean>(false);

  useEffect(() => {
    setValid(validateEmail(email));
    console.log(email);
  }, [email]);

  return isValidEmail;
};

export default useEmailValidator;
