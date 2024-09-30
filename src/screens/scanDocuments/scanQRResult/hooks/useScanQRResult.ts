// import useEchoSocket from 'hooks/useEchoSocket';
// import { useAppRoute } from 'navigation';
// import { goBack, navigate, navigateAndClearStack } from 'navigation/service';
// import { useEffect, useState } from 'react';
// import { Alert, PermissionsAndroid } from 'react-native';
// import DocumentScanner from 'react-native-document-scanner-plugin';
// import { useAppDispatch, useAppSelector } from 'reduxStore';
// import { setGlobalLoading } from 'reduxStore/slices/loadingSlice';
// import useRequest from 'services';
// import { CONSTANTS } from 'utils/constants';
// import screenNames from 'utils/constants/screenNames';
// import { constructImageFormData, isAndroid, toastError, toastSuccess } from 'utils/helpers';
// import AppStateSingleton from 'utils/singleton';

// const useScanQRResult = () => {
//   const [scannedImage, setScannedImage] = useState<string>('');
//   const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
//   const [isSkip, setIsSkip] = useState<boolean>(false);
//   const [showAlertModal, setShowAlertModal] = useState(false);
//   const { postMultipartFormRequest } = useRequest();
//   const staffId = useAppSelector(state => state.login.auth.staff_id);
//   const route = useAppRoute();
//   const dispatch = useAppDispatch();
//   const { leaveChannel, whisperToPrivate } = useEchoSocket();
//   const paramsData = route.params ?? {};

//   useEffect(() => {
//     if (AppStateSingleton.getInstance().getIsSkipAllScanDocument()) {
//       setIsSkip(true);
//     }

//     return () => leaveChannel(paramsData.socketData?.token || '');
//   }, []);

//   const onCaptureDocument = async () => {
//     if (scannedImage || isSkip) {
//       postDataToServer(false);
//     } else {
//       if (
//         isAndroid &&
//         (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)) !==
//           PermissionsAndroid.RESULTS.GRANTED
//       ) {
//         Alert.alert(
//           '誤り',
//           'ユーザーはドキュメント スキャナーを使用するためにカメラのアクセス許可を与える必要があります。'
//         );
//         return;
//       }
//       const { scannedImages } = await DocumentScanner.scanDocument({ maxNumDocuments: 1 });
//       if (scannedImages && scannedImages.length > 0) {
//         setScannedImage(scannedImages[scannedImages.length - 1]);
//       }
//     }
//   };

//   const onSendDataViaSocket = () => {
//     dispatch(setGlobalLoading(true));
//     let data = {
//       ...paramsData,
//     };
//     delete data.socketData;
//     try {
//       whisperToPrivate(paramsData.socketData?.token || '', data);
//       setTimeout(() => {
//         dispatch(setGlobalLoading(false));
//         toastSuccess(
//           paramsData.vin ?? '',
//           "translate('scanQRCode.toastSuccessWithoutPhoto')",
//           () => {
//             navigateAndClearStack(screenNames.MAIN_TAB);
//           }
//         );
//       }, CONSTANTS.WAITING_WEBSOCKET_CONNECT);
//     } catch (error) {
//       console.log('Send Message via Laravel Echo Failed', error);
//     }
//   };

//   const postDataToServer = async (navigateToHomeWhenSuccess: boolean) => {
//     dispatch(setGlobalLoading(true));
//     let data = {
//       ...paramsData,
//       staff_id: staffId ?? '',
//       affiliate_id: '',
//     };
//     delete data.socketData;
//     const formData = await constructImageFormData(scannedImage, data);
//     try {
//       const res = await postMultipartFormRequest('', formData);
//       dispatch(setGlobalLoading(false));
//       if (res) {
//         toastSuccess(paramsData.vin ?? '', 'translate(localizeKey)', () => {
//           if (navigateToHomeWhenSuccess) {
//             navigateAndClearStack(screenNames.MAIN_TAB);
//           } else {
//             goBack();
//           }
//         });
//       }
//     } catch (error: any) {
//       dispatch(setGlobalLoading(false));
//       if (error) {
//         toastError(error.message || error.error_message);
//       }
//     }
//   };

//   const onComplete = () => {
//     if (scannedImage || isSkip) {
//       postDataToServer(true);
//     } else {
//       setShowConfirmModal(true);
//     }
//   };

//   const onSkip = () => {
//     setIsSkip(true);
//     setShowConfirmModal(false);
//   };

//   const onSkipAll = () => {
//     setIsSkip(true);
//     AppStateSingleton.getInstance().setIsSkipAllScanDocument(true);
//     setShowConfirmModal(false);
//   };

//   const onBack = () => setShowAlertModal(true);

//   const closeExitModal = () => setShowAlertModal(false);

//   const onSubmitExitModal = () => {
//     closeExitModal();
//     navigate(screenNames.MAIN_TAB);
//   };

//   const onRetryScanDocument = async () => {
//     const { scannedImages } = await DocumentScanner.scanDocument({ maxNumDocuments: 1 });
//     if (scannedImages && scannedImages.length > 0) {
//       setScannedImage(scannedImages[scannedImages.length - 1]);
//     }
//   };

//   return {
//     isSkip,
//     scannedImage,
//     showConfirmModal,
//     showAlertModal,
//     route,
//     useSocket: paramsData.socketData.useSocket,
//     closeExitModal,
//     onSubmitExitModal,
//     onBack,
//     onSkip,
//     onSkipAll,
//     onCaptureDocument,
//     onComplete,
//     setShowConfirmModal,
//     onRetryScanDocument,
//     onSendDataViaSocket,
//   };
// };

// export default useScanQRResult;
