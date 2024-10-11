import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Loading, BottomTabBar } from 'components';
import React, { Fragment } from 'react';
import Toast from 'react-native-toast-message';
import {
  LoginScreen,
  ScanQRScreen,
  ScanQRResultScreen,
  LoadingScreen,
  ChooseReadMethod,
  AccountSettingScreen,
  ResetPasswordScreen,
  DriverScreen,
  HomeScreen,
  MainCamera,
  SetupScreen,
  SetUpInformationScreen,
} from 'screens';
import colors from 'utils/colors';
import screenNames from 'utils/constants/screenNames';
import { toastConfig } from 'utils/helpers';

const Root = createNativeStackNavigator();
const Home = createNativeStackNavigator();
const Drivers = createNativeStackNavigator();
const Profile = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const RootStack = () => {
  return (
    <Fragment>
      <Root.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[10] },
        }}
        initialRouteName={screenNames.LOADING}>
        <Root.Screen name={screenNames.LOADING} component={LoadingScreen} />
        <Root.Screen name={screenNames.LOGIN_SCREEN} component={LoginScreen} />
        <Root.Screen
          name={screenNames.SET_UP_INFORMATION}
          component={SetUpInformationScreen}
        />

        <Profile.Screen
          name={screenNames.ACCOUNT_SETTING_SCREEN}
          component={AccountSettingScreen}
        />
        <Root.Screen
          name={screenNames.RESET_PASSWORD_SCREEN}
          component={ResetPasswordScreen}
        />
        <Root.Screen
          name={screenNames.SCAN_QR_RESULT_SCREEN}
          component={ScanQRResultScreen}
        />
        <Root.Screen name={screenNames.MAIN_TAB} component={BottomTab} />
        <Root.Screen
          name={screenNames.SCAN_QR_SCREEN}
          component={ScanQRScreen}
        />
        <Root.Screen
          name={screenNames.CHOOSE_READ_METHOD}
          component={ChooseReadMethod}
        />
        <Root.Screen name={screenNames.MAIN_CAM} component={MainCamera} />
        <Root.Screen name={screenNames.SET_UP} component={SetupScreen} />
      </Root.Navigator>
      <Toast config={toastConfig} />
      <Loading />
    </Fragment>
  );
};

export const HomeStack = () => {
  return (
    <Fragment>
      <Home.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[10] },
        }}>
        <Home.Screen name={screenNames.HOME_SCREEN} component={HomeScreen} />
      </Home.Navigator>
    </Fragment>
  );
};

export const DriversStack = () => {
  return (
    <Fragment>
      <Drivers.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[10] },
        }}>
        <Drivers.Screen
          name={screenNames.DRIVER_SCREEN}
          component={DriverScreen}
        />
      </Drivers.Navigator>
    </Fragment>
  );
};

export const ProfileStack = () => {
  return (
    <Fragment>
      <Profile.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[10] },
        }}>
        <Profile.Screen
          name={screenNames.ACCOUNT_SETTING_SCREEN}
          component={AccountSettingScreen}
        />
      </Profile.Navigator>
    </Fragment>
  );
};

export const BottomTab = () => {
  return (
    <Fragment>
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name={screenNames.HOME_STACK} component={HomeStack} />
        <Tab.Screen name={screenNames.DRIVERS_STACK} component={DriversStack} />
        <Tab.Screen name={screenNames.PROFILE_STACK} component={ProfileStack} />
      </Tab.Navigator>
    </Fragment>
  );
};
