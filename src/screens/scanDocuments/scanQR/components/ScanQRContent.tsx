// import React from 'react';
// import { StatusBar, StyleSheet, View } from 'react-native';
// import { Camera } from 'react-native-camera-kit';
// import colors from 'utils/colors';
// import { deviceWidth } from 'utils/themes';

// import { useInspectionQRCode } from './InspectionQRStore';

// interface ScanQRcodeContentProps {
//   isScanning: boolean;
//   showWarning: boolean;
//   onFinish(): void;
//   onQRCodeRead(event: any): void;
//   hasCameraPermission?: boolean;
// }

// const ScanQRcodeContent = ({
//   isScanning,
//   // showWarning,
//   // onFinish,
//   onQRCodeRead,
//   hasCameraPermission,
// }: ScanQRcodeContentProps) => {
//   const { code2_1, code2_2, code3_1, code3_2, code3_3, kei2, kei3 } = useInspectionQRCode();

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
//       {isScanning && hasCameraPermission && (
//         <Camera
//           style={styles.squareCamera}
//           cameraType="back"
//           scanBarcode={isScanning}
//           onReadCode={onQRCodeRead}
//         />
//       )}

//       <View style={styles.qrMaskWrapper}>
//         <View style={[styles.qrMask, (!!code3_1 || !!kei2) && { borderColor: colors.primary }]} />
//         <View style={[styles.qrMask, (!!code3_2 || !!kei3) && { borderColor: colors.primary }]} />
//         <View style={[styles.qrMask, !!code3_3 && { borderColor: colors.primary }]} />
//         <View style={[styles.qrMask, !!code2_1 && { borderColor: colors.primary }]} />
//         <View style={[styles.qrMask, !!code2_2 && { borderColor: colors.primary }]} />
//       </View>
//     </View>
//   );
// };

// export default ScanQRcodeContent;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: colors.black[100],
//   },
//   header: {
//     alignItems: 'center',
//     height: 40,
//     justifyContent: 'center',
//   },
//   squareCamera: {
//     width: deviceWidth,
//     height: '100%',
//   },
//   finishButton: {
//     backgroundColor: colors.primary,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     position: 'absolute',
//     left: 16,
//     height: 40,
//     justifyContent: 'center',
//   },
//   finishButtonText: {
//     color: colors.white,
//   },
//   title: {
//     color: colors.white,
//   },
//   note: {
//     color: colors.white,
//     textAlign: 'center',
//   },
//   qrMask: {
//     width: 40,
//     height: 40,
//     borderWidth: 4,
//     borderColor: 'transparent',
//   },
//   qrMaskWrapper: {
//     position: 'absolute',
//     flexDirection: 'row',
//     gap: 4,
//     top: '66%',
//   },
//   warningWrapper: {
//     padding: 16,
//     paddingRight: 0,
//     borderRadius: 8,
//     borderWidth: 2,
//     borderColor: colors.primary,
//     marginHorizontal: 16,
//     backgroundColor: colors.white,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   warningTitle: {
//     color: colors.primary,
//   },
//   warningContent: {
//     color: colors.black[100],
//   },
// });
