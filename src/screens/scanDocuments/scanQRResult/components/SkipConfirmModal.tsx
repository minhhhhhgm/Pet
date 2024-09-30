import { BottomSheet, MButton, MText, SizeBox } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from 'utils/colors';

interface SkipConfirmModal {
  visible: boolean;
  closeModal(): void;
  onSkipThisCar(): void;
  onSkipAllCar(): void;
}

const SkipConfirmModal = ({
  visible,
  onSkipThisCar,
  onSkipAllCar,
  closeModal,
}: SkipConfirmModal) => {
  return (
    <BottomSheet visible={visible} closeModal={closeModal}>
      <SizeBox height={8} />
      <MText style={styles.confirmText}>{"translate('scanQRCode.titleSkipModal')"}</MText>
      <SizeBox height={16} />
      <MButton thirdType label={"translate('scanQRCode.skipCheck')"} onPress={onSkipThisCar} />
      <SizeBox height={8} />
      <MButton thirdType label={"translate('scanQRCode.skipAll')"} onPress={onSkipAllCar} />
      <SizeBox height={16} />
      <MText style={styles.warningText}>{"translate('scanQRCode.warningInSkipModal')"}</MText>
    </BottomSheet>
  );
};

export default SkipConfirmModal;

const styles = StyleSheet.create({
  confirmText: {
    textAlign: 'center',
  },
  warningText: {
    color: colors.black[100],
    textAlign: 'center',
  },
});
