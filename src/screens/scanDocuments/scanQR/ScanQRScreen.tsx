import React from 'react';
import ScanQRcodeContent from './components/ScanQRContent';
import useScanQRCode from './hooks/useScanQRCode';

const ScanQRScreen = () => {
  const { isScanning, showWarning, onFinish, onQRCodeRead } = useScanQRCode();

  return (
    <ScanQRcodeContent
      isScanning={isScanning}
      showWarning={showWarning}
      hasCameraPermission={true}
      onFinish={onFinish}
      onQRCodeRead={onQRCodeRead}
    />
  );
};

export default ScanQRScreen;
