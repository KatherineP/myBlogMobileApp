import React from 'react';
import { THEME } from '../THEME';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackNavigator, BookedStackNavigator } from './mainStackNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  function getTabBarVisible(route) {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'PostScreen') {
      return false;
    }
    return true;
  }

  return (
    <Tab.Navigator
      initialRouteName="MainScreen"
      tabBarOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="MainScreen"
        component={MainStackNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
          tabBarLabel: 'posts',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="folder" color={color} size={25} />
          ),
        })}
      />
      <Tab.Screen
        name="BookedScreen"
        component={BookedStackNavigator}
        options={{
          tabBarLabel: 'bookmarked',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bookmark" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
