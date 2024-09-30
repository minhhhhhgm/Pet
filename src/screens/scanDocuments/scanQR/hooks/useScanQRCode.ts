import { useIsFocused } from '@react-navigation/native';
import { useAppRoute } from 'navigation';
import { goBack, navigate } from 'navigation/service';
import { useEffect, useState } from 'react';
import { InteractionManager } from 'react-native';
import { CarInformation, SocketQRData } from 'types/carInformation.type';
import screenNames from 'utils/constants/screenNames';
import * as CarInformationExtraction from '../components/CarInformationExtraction';
import { useInspectionQRCode } from '../components/InspectionQRStore';

const useScanQRCode = () => {
  const { params } = useAppRoute();
  const useSocket = params?.useSocket || '';
  const socketQRData: SocketQRData = params || {};
  const [isScanning, setIsScanning] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [timeoutShowWarning, setTimeoutShowWarning] = useState<
    string | number | NodeJS.Timeout | undefined
  >();
  const isFocus = useIsFocused();

  const {
    initQRState,
    recognizeQR,
    code2_1,
    code2_2,
    code3_1,
    code3_2,
    code3_3,
    kei2,
    kei3,
    other,
  } = useInspectionQRCode();

  const onFinish = () => {
    initQRState();
    setIsScanning(false);
    clearTimeout(timeoutShowWarning);
    setShowWarning(false);
    InteractionManager.runAfterInteractions(() => {
      if (useSocket) {
        navigate(screenNames.CHOOSE_READ_METHOD);
      } else {
        goBack();
      }
    });
  };

  const onQRCodeRead = (event: any) => {
    if (isScanning) {
      const value: string = event.nativeEvent.codeStringValue;
      recognizeQR(value);
      transformQrCodeDataToCarInformation();
    }
  };

  const transformQrCodeDataToCarInformation = () => {
    let result: CarInformation | undefined;
    if (code2_1 && code2_2 && code3_1 && code3_2 && code3_3) {
      result = CarInformationExtraction.read5QrNormalCar(false, false, [
        code3_1,
        code3_2,
        code3_3,
        code2_1,
        code2_2,
      ]);
    } else if (kei2 && kei3) {
      result = CarInformationExtraction.read3QrLightCar([kei3, kei2]);
    } else if (code2_1 && code2_2 && code3_1 && code3_2 && code3_3 && other) {
      result = CarInformationExtraction.read6QrLightCar([
        code3_1,
        code3_2,
        code3_3,
        code2_1,
        code2_2,
        other,
      ]);
    }
    if (result) {
      setIsScanning(false);
      clearTimeout(timeoutShowWarning);
      setShowWarning(false);
      navigate(screenNames.SCAN_QR_RESULT_SCREEN, {
        ...result,
        socketData: { useSocket, token: socketQRData?.token },
      });
      initQRState();
    }
  };

  useEffect(() => {
    setTimeoutShowWarning(
      setTimeout(() => {
        setShowWarning(true);
      }, 30000)
    );
  }, []);

  useEffect(() => {
    if (isFocus) {
      setIsScanning(true);
    }
  }, [isFocus]);

  return {
    isScanning,
    showWarning,
    onQRCodeRead,
    onFinish,
  };
};

export default useScanQRCode;
