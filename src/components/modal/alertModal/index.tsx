import SizeBox from 'components/sizeBox';
import MText from 'components/text';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import colors from 'utils/colors';

interface AlertModalProps {
  visible: boolean;
  title?: string;
  subTitle?: string;
  subTitleColor?: string;
  customSubTitleView?: React.ReactNode;
  closeExitTitle?: string;
  closeExitModal(): void;
  submitExitButtonBackgroundColor?: string;
  submitExitTitle?: string;
  onSubmitExitModal(): void;
}

const AlertModal = ({
  visible,
  title,
  subTitle,
  subTitleColor,
  customSubTitleView,
  closeExitTitle,
  closeExitModal,
  submitExitButtonBackgroundColor,
  submitExitTitle,
  onSubmitExitModal,
}: AlertModalProps) => {
  const renderSubtitleView = () => {
    if (customSubTitleView) {
      return customSubTitleView;
    }
    return (
      <>
        {subTitle && (
          <MText
            style={[styles.content, { color: subTitleColor ? subTitleColor : colors.black[100] }]}>
            {subTitle}
          </MText>
        )}
      </>
    );
  };

  return (
    <Modal useNativeDriverForBackdrop hasBackdrop isVisible={visible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          {title && <MText style={styles.title}>{title}</MText>}
          <SizeBox height={16} />
          {renderSubtitleView()}
          <SizeBox height={40} />
          <View style={styles.buttonWrapper}>
            <Pressable onPress={closeExitModal} style={[styles.button, styles.cancelButton]}>
              <MText style={[styles.buttonText, styles.cancelButtonText]}>{closeExitTitle}</MText>
            </Pressable>
            <Pressable
              onPress={onSubmitExitModal}
              style={[
                styles.button,
                {
                  backgroundColor: submitExitButtonBackgroundColor
                    ? submitExitButtonBackgroundColor
                    : colors.primary,
                },
              ]}>
              <MText style={styles.buttonText}>{submitExitTitle}</MText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 16,
  },
  title: {
    textAlign: 'center',
  },
  button: {
    height: 40,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  content: {
    textAlign: 'center',
  },
  buttonText: {
    color: colors.white,
  },
  cancelButtonText: {
    color: colors.black[100],
  },
  cancelButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray[20],
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
});
