import { Container, MButton, MText, SizeBox } from 'components';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CarInformation } from 'types/carInformation.type';
import colors from 'utils/colors';
import { SampleScanIcon, WarningIcon } from 'utils/icons';
import { deviceWidth } from 'utils/themes';

interface ScanQRResultContentProps {
  isSkip: boolean;
  scannedImage: string;
  useSocket: boolean;
  carInformation: CarInformation;
  onBack(): void;
  onComplete(): void;
  onCaptureDocument(): void;
  onRetryScanDocument(): void;
  onSendDataViaSocket(): void;
}

const DOC_WIDTH = deviceWidth - 64;
const DOC_HEIGHT = DOC_WIDTH * 0.742; // ratio same as design

const ScanQRResultContent = ({
  isSkip,
  scannedImage,
  carInformation,
  useSocket,
  onBack,
  onComplete,
  onCaptureDocument,
  onRetryScanDocument,
  onSendDataViaSocket,
}: ScanQRResultContentProps) => {
  const { bottom } = useSafeAreaInsets();

  const ButtonComponents = () => {
    if (useSocket) {
      return (
        <MButton
          label={"translate('scanQRCode.chooseReadMethod.returnToHome')"}
          onPress={onSendDataViaSocket}
        />
      );
    }
    return (
      <>
        <MButton label={''} onPress={onCaptureDocument} />
        <SizeBox height={8} />

        <MButton thirdType label={''} onPress={onComplete} />
      </>
    );
  };

  return (
    <>
      <Container
        scrollable
        secondBackButtonTitle
        isShowHeader
        showBackButton={!(isSkip || !!scannedImage || useSocket)}
        backButtonTitle={"translate('scanQRCode.cancel')"}
        title={"translate('scanQRCode.title')"}
        onBack={onBack}>
        <SizeBox height={24} />
        <View style={styles.carInfoCard}>
          <MText style={styles.cardInfoTitle}>
            {"translate('scanQRCode.iReadCarInspectionCert')"}
          </MText>
          <SizeBox height={16} />

          <View style={styles.infoWrapper}>
            <View style={styles.carNumber}>
              <MText
                style={
                  styles.carNumberText
                }>{`${carInformation.transport_bu_name} ${carInformation.class_no}`}</MText>
              <MText style={styles.carNumberNumeric}>
                {carInformation.hiragana}
                <MText
                  style={[
                    styles.carNumberNumeric,
                    { fontWeight: '600' },
                  ]}>{`・${carInformation.registry_no}`}</MText>
              </MText>
            </View>
            <SizeBox width={10} />
            <View style={styles.chassisNumberContainer}>
              <MText style={styles.chassisNumber}>{`${"translate('scanQRCode.vinTitle')"} : ${
                carInformation.vin
              }`}</MText>
            </View>
          </View>
        </View>
        <SizeBox height={16} />

        {!isSkip && !useSocket && (
          <View style={styles.carInfoCard}>
            {!scannedImage && (
              <>
                <MText style={styles.cardInfoTitle}>
                  {"translate('scanQRCode.pleaseCaptureCarInspectionCert')"}
                </MText>
                <SizeBox height={8} />
              </>
            )}

            <View style={styles.noteWrapper}>
              {!!scannedImage ? (
                <View style={styles.warning}>
                  <MText style={[styles.warningTitle, { color: colors.black[100] }]}>
                    {"translate('scanQRCode.checkList')"}
                  </MText>
                </View>
              ) : (
                <View style={styles.warning}>
                  <WarningIcon width={16} height={16} />
                  <SizeBox width={4} />
                  <MText style={styles.warningTitle}>
                    {"translate('scanQRCode.captureWarning')"}
                  </MText>
                </View>
              )}
              <SizeBox height={4} />

              <View style={styles.warningContent}>
                <MText style={styles.dot}>・</MText>
                <MText style={styles.carName}>
                  {!!scannedImage
                    ? "translate('scanQRCode.noteAfterCapture1')"
                    : "translate('scanQRCode.captureWarningContent1')"}
                </MText>
              </View>

              <View style={styles.warningContent}>
                <MText style={styles.dot}>・</MText>
                <MText style={styles.carName}>
                  {!!scannedImage
                    ? "translate('scanQRCode.noteAfterCapture2')"
                    : "translate('scanQRCode.captureWarningContent2')"}
                </MText>
              </View>
            </View>

            <SizeBox height={8} />
            {!!scannedImage ? (
              <View>
                <Image source={{ uri: scannedImage }} style={styles.preDoc} />
                <SizeBox height={8} />
                <MButton
                  thirdType
                  label={"translate('scanQRCode.retake')"}
                  onPress={onRetryScanDocument}
                />
              </View>
            ) : (
              <View style={styles.notePictureWrapper}>
                <SampleScanIcon />
              </View>
            )}
          </View>
        )}
      </Container>

      <View style={[styles.bottomAction, !!bottom && { paddingBottom: bottom }]}>
        <ButtonComponents />
      </View>
    </>
  );
};

export default ScanQRResultContent;

const styles = StyleSheet.create({
  carInfoCard: {
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 16,
  },
  cardInfoTitle: {},
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carNumber: {
    borderRadius: 5,
    borderColor: colors.gray[20],
    borderWidth: 1,
    padding: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  carNumberText: {
    color: colors.black[100],
    fontSize: 10,
    fontWeight: '300',
  },
  carNumberNumeric: {
    color: colors.black[100],
    fontSize: 12,
    fontWeight: '300',
  },
  carName: {
    fontSize: 12,
    fontWeight: '500',
  },
  chassisNumberContainer: {
    flex: 1,
  },
  chassisNumber: {
    color: colors.black[100],
  },
  noteWrapper: {
    padding: 8,
    backgroundColor: colors.gray[10],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[20],
  },
  notePictureWrapper: {
    backgroundColor: colors.gray[10],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[20],
    paddingTop: 24,
    alignItems: 'center',
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 18,
    textAlign: 'center',
  },
  bottomAction: {
    padding: 16,
  },
  completeButtonText: {
    color: colors.black[100],
  },
  completeButton: {
    borderColor: colors.gray[20],
  },
  preDoc: {
    borderRadius: 8,
    width: DOC_WIDTH,
    height: DOC_HEIGHT,
    resizeMode: 'stretch',
  },
});
