import { useEffect, useState } from 'react';
import { validatePassword } from 'utils/validations';

const usePasswordValidator = (password: string) => {
  const [isValid, setValid] = useState<boolean>(false);

  useEffect(() => {
    console.log(password.length);
    if(password.length >= 6){
      console.log('true');
      setValid(true);
    }
    else{ 
      console.log('false');
      setValid(false)}
   
  }, [password]);

  return isValid;
};

export default usePasswordValidator;
