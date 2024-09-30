import { useState } from 'react';
import useEmailConfirmValidator from './useEmailConfirmValidator';
import useEmailValidator from './useEmailValidator';

const useResetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const isValidEmail = useEmailValidator(email);
  const isValidEmailConfirm = useEmailConfirmValidator(email, emailConfirm);
  const isValid = isValidEmail && isValidEmailConfirm;

  const onChangeEmail = (text?: string) => {
    setEmail(text ?? '');
  };

  const onChangeEmailConfirm = (text?: string) => {
    setEmailConfirm(text ?? '');
  };

  const onSend = () => {};
  return {
    email,
    emailConfirm,
    isValid,
    onChangeEmail,
    onChangeEmailConfirm,
    onSend,
  };
};

export default useResetPassword;
