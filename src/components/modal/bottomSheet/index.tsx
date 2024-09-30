import React, { ReactNode } from 'react';
import { SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import colors from 'utils/colors';

interface BottomModalProps {
  containerStyle?: StyleProp<ViewStyle>;
  visible: boolean;
  fullScreen?: boolean;
  children: ReactNode;
  closeModal(): void;
}

const BottomSheet = ({
  visible,
  children,
  fullScreen,
  containerStyle,
  closeModal,
}: BottomModalProps) => {
  return (
    <Modal
      useNativeDriverForBackdrop
      hasBackdrop
      onBackdropPress={() => !fullScreen && closeModal()}
      style={{ margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={visible}>
      <SafeAreaView />
      <View style={[styles.modal, fullScreen && { flex: 1 }, containerStyle]}>{children}</View>
      <SafeAreaView style={{ backgroundColor: colors.white }} />
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    marginTop: 'auto',
  },
  title: {
    textAlign: 'center',
  },
  titleWrapper: {
    height: 32,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
