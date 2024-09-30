import React from 'react';
import ChooseReadMethodContent from './components/ChooseReadMethodContent';
import useChooseReadMethod from './hooks/useChooseReadMethod';

const ChooseReadMethod = () => {
  const { readMethods, selectedMethod, setSelectedMethod, onSubmit } = useChooseReadMethod();

  return (
    <ChooseReadMethodContent
      readMethods={readMethods}
      selectedMethod={selectedMethod}
      setSelectedMethod={setSelectedMethod}
      onSubmit={onSubmit}
    />
  );
};

export default ChooseReadMethod;
