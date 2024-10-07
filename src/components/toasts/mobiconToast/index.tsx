import SizeBox from 'components/sizeBox';
import MText from 'components/text';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import colors from 'utils/colors';
import { ToastSuccess, WarningIcon } from 'utils/icons';

const MBCToast = ({
  error,
  text1,
  text2,
}: { error: boolean } & BaseToastProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.wrapper, error && { borderColor: colors.primary }]}>
        {error ? (
          <WarningIcon width={24} height={24} />
        ) : (
          <ToastSuccess width={24} height={24} />
        )}
        <SizeBox width={8} />
        <View style={styles.titleContentWrapper}>
          <MText style={[styles.title, error && { color: colors.primary }]}>
            {text2}
          </MText>
          <SizeBox height={4} />
          <MText style={[styles.content, error && { color: colors.primary }]}>
            {text1}
          </MText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  wrapper: {
    padding: 16,
    paddingRight: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  titleContentWrapper: {
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    color: colors.black[100],
  },
  content: {
    color: colors.black[100],
  },
});

export default MBCToast;
