import { useIsFocused } from '@react-navigation/native';
import useEchoSocket from 'hooks/useEchoSocket';
import { goBack, navigate } from 'navigation/service';
import { useEffect, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import { SocketQRData } from 'types/carInformation.type';
import { CONSTANTS } from 'utils/constants';
import screenNames from 'utils/constants/screenNames';

const useScanSocketQR = () => {
  const [isScanning, setIsScanning] = useState(true);
  const isFocus = useIsFocused();
  const isCameraActive = useRef<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState(false);
  const [timeoutShowWarning, setTimeoutShowWarning] = useState<
    string | number | NodeJS.Timeout | undefined
  >();

  const { listenToPrivate } = useEchoSocket();

  const onFinish = () => {
    setIsScanning(false);
    clearTimeout(timeoutShowWarning);
    setShowWarning(false);
    InteractionManager.runAfterInteractions(() => {
      goBack();
    });
  };

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const onQRCodeRead = (event: any) => {
    if (isScanning && isCameraActive.current) {
      const value: SocketQRData & string = event.nativeEvent.codeStringValue;
      if (!isJsonString(value)) return;
      const socketData: SocketQRData = JSON.parse(value);
      if (socketData.token) {
        isCameraActive.current = false;
        setLoading(true);
        listenToPrivate(socketData.token, () => {
          // Handle event
        });
        setTimeout(() => {
          setLoading(false);
          clearTimeout(timeoutShowWarning);
          setShowWarning(false);
          navigate(screenNames.SCAN_QR_SCREEN, { useSocket: true, ...socketData });
          isCameraActive.current = true;
        }, CONSTANTS.WAITING_WEBSOCKET_CONNECT);
      }
    }
  };

  useEffect(() => {
    if (isFocus) {
      isCameraActive.current = true;
      setIsScanning(true);
    }
  }, [isFocus]);

  useEffect(() => {
    setTimeoutShowWarning(
      setTimeout(() => {
        setShowWarning(true);
      }, 30000)
    );
  }, []);

  return {
    loading,
    showWarning,
    isScanning,
    onQRCodeRead,
    onFinish,
  };
};

export default useScanSocketQR;
