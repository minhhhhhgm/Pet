import 'react-native-gesture-handler';
import AppNavigator from 'navigation';
import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'reduxStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import socket from 'services/socket'; 
Appearance.setColorScheme('light');



const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server in App');
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>     
    </SafeAreaProvider>
  );
};

export default App;
