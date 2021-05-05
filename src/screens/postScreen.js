import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
} from 'react-native';
import { toggleBooked, deletePost } from '../store/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../THEME';
import { MaterialHeaderButtons } from '../components/appHeaderIcon';
import { Item } from 'react-navigation-header-buttons';

export const PostScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.allPosts);
  const { itemId } = route.params;
  const post = allPosts.find((post) => post.id === itemId);
  const booked = useSelector((state) =>
    state.post.bookedPosts.some((post) => post.id === itemId)
  );

  const removePost = () => {
    Alert.alert(
      'Delete confirmation',
      `Are you sure you want to delete Post ${post.id} ?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            navigation.navigate('MainScreen');
            dispatch(deletePost(itemId));
          },
        },
      ],
      { cancelable: false }
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialHeaderButtons>
          <Item
            title="Star-outline"
            iconName={booked ? 'star' : 'star-outline'}
            onPress={() => dispatch(toggleBooked(post))}
          />
        </MaterialHeaderButtons>
      ),
    });
  }, [navigation, booked]);

  if (!post) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image style={styles.image} source={{ uri: post.img }}></Image>
      <Text style={styles.text}>{post.text}</Text>
      <Button
        title="delete"
        color={THEME.DANGER_COLOR}
        onPress={removePost}
      ></Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingTop: 20,
    fontFamily: 'open-regular',
    alignItems: 'center',
    fontSize: 15,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
});
