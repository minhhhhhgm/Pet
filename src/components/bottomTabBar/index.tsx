import MText from 'components/text';
import { navigate } from 'navigation/service';
import React from 'react';
import { TouchableOpacity, View, SafeAreaView, StyleSheet } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import colors from 'utils/colors';
import screenNames from 'utils/constants/screenNames';
// import { CarFrontIcon, CustomerIcon, SettingIcon } from 'utils/icons';
// import { useAppTranslation } from 'utils/languages';

export default function BottomTabBar({ state, descriptors }: any) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const isHasNotch = true;

  // const translate = useAppTranslation('common');

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const renderTabName = (routeName: string) => {
    switch (routeName) {
      case screenNames.HOME_STACK:
        return 'aksld';
      case screenNames.DRIVERS_STACK:
        return 'aksld';
      case screenNames.PROFILE_STACK:
        return 'aksld';
      default:
        break;
    }
  };

  const renderIcon = (routeName: string, isFocused: boolean) => {
    const currentColor = isFocused ? colors.yellow[20] : colors.gray[30];

    switch (routeName) {
      case screenNames.HOME_STACK:
        return null;
      case screenNames.DRIVERS_STACK:
        return null;
      case screenNames.PROFILE_STACK:
        return null;
      default:
        return;
    }
  };

  return (
    <View
      style={[styles.containerStyle, { paddingBottom: isHasNotch ? 15 : 0 }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          navigate(route.name);
        };

        return (
          <TouchableOpacity
            activeOpacity={1}
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}>
            {renderIcon(route.name, isFocused)}
            <MText
              style={[
                styles.tabBarText,
                { color: isFocused ? colors.yellow[20] : colors.gray[30] },
              ]}>
              {renderTabName(route.name)}
            </MText>
          </TouchableOpacity>
        );
      })}
      <SafeAreaView style={{ backgroundColor: colors.white }} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: colors.black[100],
    ...colors.mediumShadow,
  },
  tabButton: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabBarText: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 8,
  },
});
