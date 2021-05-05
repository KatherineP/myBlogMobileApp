import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialHeaderButtons } from '../components/appHeaderIcon';
import { Item } from 'react-navigation-header-buttons';

export const AboutScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MaterialHeaderButtons>
          <Item
            title="Menu"
            iconName="menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </MaterialHeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.center}>
      <Text>Version 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
