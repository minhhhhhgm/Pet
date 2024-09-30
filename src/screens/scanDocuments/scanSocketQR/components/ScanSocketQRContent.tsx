// import React from 'react';
// import { StatusBar, StyleSheet, View } from 'react-native';
// import { Camera } from 'react-native-camera-kit';
// import colors from 'utils/colors';
// import { deviceWidth } from 'utils/themes';

// interface ScanQRcodeContentProps {
//   isScanning: boolean;
//   hasCameraPermission?: boolean;
//   showWarning: boolean;
//   onFinish(): void;
//   onQRCodeRead(event: any): void;
// }

// const ScanSocketQRContent = ({
//   // showWarning,
//   isScanning,
//   hasCameraPermission,
//   // onFinish,
//   onQRCodeRead,
// }: ScanQRcodeContentProps) => {
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
//     </View>
//   );
// };

// export default ScanSocketQRContent;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: colors.black[100],
//   },
//   squareCamera: {
//     width: deviceWidth,
//     height: '100%',
//   },
// });
