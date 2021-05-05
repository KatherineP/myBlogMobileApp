import React from 'react';
import { MainScreen } from '../screens/mainScreen';
import { PostScreen } from '../screens/postScreen';
import { BookedScreen } from '../screens/bookedScreen';
import { THEME } from '../THEME';
import { createStackNavigator } from '@react-navigation/stack';
import { AboutScreen } from '../screens/aboutScreen';
import { CreateScreen } from '../screens/createScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  title: 'Navigation App',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({ route }) => ({ title: `Post ${route.params.itemId}` })}
      />
    </Stack.Navigator>
  );
};

export const BookedStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="BookedScreen" component={BookedScreen} />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({ route }) => ({ title: `Post ${route.params.itemId}` })}
      />
    </Stack.Navigator>
  );
};

export const AboutNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ title: 'About' }}
      />
    </Stack.Navigator>
  );
};

export const CreateNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{ title: 'Create Post' }}
      />
    </Stack.Navigator>
  );
};
