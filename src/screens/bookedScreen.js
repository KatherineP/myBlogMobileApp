import React from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { Post } from '../components/post';
import { MaterialHeaderButtons } from '../components/appHeaderIcon';
import { Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

export const BookedScreen = ({ navigation }) => {
  const bookedPosts = useSelector((state) => state.post.bookedPosts);

  const goToPost = (post) => {
    navigation.navigate('PostScreen', {
      itemId: post.id,
    });
  };

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
    <View style={styles.wrapper}>
      <FlatList
        data={bookedPosts}
        renderItem={({ item }) => <Post post={item} onOpen={goToPost} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});
