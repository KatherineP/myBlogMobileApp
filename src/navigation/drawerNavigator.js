import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabNavigator } from './tabNavigator';
import { AboutNavigator } from './mainStackNavigator';
import { CreateNavigator } from './mainStackNavigator';
import { THEME } from '../THEME';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        itemStyle: { marginVertical: 10 },
        labelStyle: {
          fontFamily: 'open-bold',
        },
      }}
    >
      <Drawer.Screen
        name="MainScreen"
        component={BottomTabNavigator}
        options={{ drawerLabel: 'Posts' }}
      />
      <Drawer.Screen
        name="AboutScreen"
        component={AboutNavigator}
        options={{ drawerLabel: 'About' }}
      />
      <Drawer.Screen
        name="CreateScreen"
        component={CreateNavigator}
        options={{ drawerLabel: 'Create Post' }}
      />
    </Drawer.Navigator>
  );
};
