import MText from 'components/text';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import { HeaderButtonType } from 'types/header.type';
import colors from 'utils/colors';
import {
  BackIcon,
  Close,
  BellIcon,
  SettingsIcon,
  QuestionIcon,
} from 'utils/icons';

type HeaderProps = {
  title: string;
  headerLeftType?:
    | HeaderButtonType.Back
    | HeaderButtonType.Text
    | HeaderButtonType.Close;
  headerRightType?:
    | HeaderButtonType.Close
    | HeaderButtonType.Text
    | HeaderButtonType.Support
    | HeaderButtonType.Bell
    | HeaderButtonType.Settings;
  rightButtonTitle?: string;
  leftButtonTitle?: string;
  style?: StyleProp<ViewStyle>;
  leftOnPress?: () => void;
  rightOnPress?: () => void;
};

export default function Header({
  headerLeftType,
  leftOnPress,
  leftButtonTitle,
  headerRightType,
  rightOnPress,
  rightButtonTitle,
  title,
  style,
}: HeaderProps) {
  const renderLeft = (headerLeftType: HeaderProps['headerLeftType']) => {
    switch (headerLeftType) {
      case HeaderButtonType.Back:
        return <BackIcon />;
      case HeaderButtonType.Close:
        return <Close />;
      case HeaderButtonType.Text:
        return (
          <MText color={colors.gray[100]} fontSize={16} fontWeight="700">
            {leftButtonTitle}
          </MText>
        );
      default:
        return;
    }
  };

  const renderRight = (headerRightType: HeaderProps['headerRightType']) => {
    switch (headerRightType) {
      case HeaderButtonType.Close:
        return <Close />;
      case HeaderButtonType.Support:
        return <QuestionIcon />;
      case HeaderButtonType.Bell:
        return <BellIcon />;
      case HeaderButtonType.Settings:
        return <SettingsIcon />;
      case HeaderButtonType.Text:
        return (
          <MText color={colors.primary} fontSize={16} fontWeight="700">
            {rightButtonTitle}
          </MText>
        );
      default:
        return;
    }
  };

  const leftOnPressHandler = () => {
    if (leftOnPress) {
      return leftOnPress();
    } else {
      return;
    }
  };

  const rightOnPressHandler = () => {
    if (rightOnPress) {
      return rightOnPress();
    } else {
      return;
    }
  };

  return (
    <View>
      <View style={[styles.headerContainer, style]}>
        <MText fontSize={16} fontWeight="700" style={styles.title}>
          {title}
        </MText>

        {headerLeftType && (
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={leftOnPressHandler}>
              {renderLeft(headerLeftType)}
            </TouchableOpacity>
          </View>
        )}

        {headerRightType && (
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={rightOnPressHandler}>
              {renderRight(headerRightType)}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  headerLeft: {
    position: 'absolute',
    left: 15,
  },
  headerRight: {
    position: 'absolute',
    right: 15,
  },
});
