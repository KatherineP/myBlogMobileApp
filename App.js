import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { bootstrap } from './src/bootstrap';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigation/drawerNavigator';
import store from './src/store';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}
