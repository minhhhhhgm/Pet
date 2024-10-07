import { navigate } from 'navigation/service';
import { useState } from 'react';
import screenNames from 'utils/constants/screenNames';

export enum ReadMethod {
  IC,
  QR,
  MOBICON_QR,
}

const useChooseReadMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<ReadMethod>(
    ReadMethod.IC,
  );

  const readMethods = [
    // { label: translate('scanQRCode.chooseReadMethod.readICCard'), id: ReadMethod.IC }, // TODO
    {
      label: "translate('scanQRCode.chooseReadMethod.scanQRCode')",
      id: ReadMethod.QR,
    },
    {
      label: "translate('scanQRCode.chooseReadMethod.scanQRCodeMobicon')",
      id: ReadMethod.MOBICON_QR,
    },
  ];

  const onSubmit = () => {
    switch (selectedMethod) {
      case ReadMethod.QR:
        navigate(screenNames.SCAN_QR_SCREEN);
        break;
      case ReadMethod.MOBICON_QR:
        navigate(screenNames.SCAN_SOCKET_QR);
        break;
      default:
        break;
    }
  };

  return {
    selectedMethod,
    readMethods,
    setSelectedMethod,
    onSubmit,
  };
};

export default useChooseReadMethod;
