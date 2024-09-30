import MText from 'components/text';
import { goBack } from 'navigation/service';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import colors from 'utils/colors';
import { ChevronLeft } from 'utils/icons';

type Props = {
  title?: string;
  showBackButton?: boolean;
  backButtonTitle?: string;
  showBackButtonIcon?: boolean;
  onBack?: () => void;
  onRightButton?: () => void;
  secondBackButtonTitle?: boolean;
};

const HeaderView = (props: Props) => {
  const {
    showBackButtonIcon,
    backButtonTitle,
    showBackButton,
    title,
    secondBackButtonTitle,
    onBack,
  } = props;

  const renderBackButton = () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={onBack || goBack}>
        {showBackButtonIcon ? <ChevronLeft fill={colors.primary} /> : null}
        <MText
          style={[
            styles.backButtonTitle,
            secondBackButtonTitle && { color: colors.gray[20], fontWeight: '600' },
          ]}>
          {backButtonTitle}
        </MText>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <SafeAreaView style={styles.safeAreaBackGround} />
      <View style={styles.header}>
        {showBackButton ? renderBackButton() : null}
        <View style={styles.centerHeader}>
          <MText style={styles.title}>{title}</MText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaBackGround: {
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: colors.gray[20],
  },
  title: {
    textAlign: 'center',
  },
  centerHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 8,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  backButtonTitle: {
    color: colors.primary,
    paddingHorizontal: 6,
  },
  rightButton: {
    position: 'absolute',
    right: 12,
    padding: 12,
    zIndex: 1,
  },
});

export default HeaderView;
