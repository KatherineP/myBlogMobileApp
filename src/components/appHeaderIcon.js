import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton, HeaderButtons } from 'react-navigation-header-buttons';
import { THEME } from '../THEME';
import { MaterialIcons } from '@expo/vector-icons';

export const AppHeaderIcon = (props) => {
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      IconComponent={MaterialIcons}
      color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
    />
  );
};

export const MaterialHeaderButtons = (props) => {
  return <HeaderButtons HeaderButtonComponent={AppHeaderIcon} {...props} />;
};
