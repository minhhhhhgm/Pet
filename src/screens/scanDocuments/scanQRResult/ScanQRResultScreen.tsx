import { AlertModal } from 'components';
import React from 'react';
import ScanQRResultContent from './components/ScanQRResultContent';
import SkipConfirmModal from './components/SkipConfirmModal';
import useScanQRResult from './hooks/useScanQRResult';

const ScanQRResultScreen = () => {
  const {
    isSkip,
    scannedImage,
    showConfirmModal,
    showAlertModal,
    route,
    useSocket,
    onBack,
    closeExitModal,
    onSubmitExitModal,
    onSkip,
    onSkipAll,
    onComplete,
    setShowConfirmModal,
    onCaptureDocument,
    onRetryScanDocument,
    onSendDataViaSocket,
  } = useScanQRResult();

  return (
    <>
      <ScanQRResultContent
        useSocket={useSocket}
        isSkip={isSkip}
        scannedImage={scannedImage}
        onBack={onBack}
        onComplete={onComplete}
        onCaptureDocument={onCaptureDocument}
        onRetryScanDocument={onRetryScanDocument}
        carInformation={route.params}
        onSendDataViaSocket={onSendDataViaSocket}
      />
      <SkipConfirmModal
        onSkipThisCar={onSkip}
        onSkipAllCar={onSkipAll}
        visible={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
      />
      <AlertModal
        visible={showAlertModal}
        title={"translate('common.exitModal.title')"}
        subTitle={"translate('common.exitModal.content')"}
        closeExitTitle={"translate('common.exitModal.cancel')"}
        closeExitModal={closeExitModal}
        submitExitTitle={"translate('common.exitModal.submit')"}
        onSubmitExitModal={onSubmitExitModal}
      />
    </>
  );
};

export default ScanQRResultScreen;
