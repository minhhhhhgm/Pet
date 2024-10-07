import { NavigationContainer, useRoute } from '@react-navigation/native';
import React from 'react';
import { navigationRef } from './service';
import { RootStack } from './stack';

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
};

export default AppNavigator;

export const useAppRoute = () => useRoute<any>();
