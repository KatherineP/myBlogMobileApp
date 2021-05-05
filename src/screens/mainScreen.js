import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { uploadAllPosts } from '../store/actionCreators';
import { Post } from '../components/post';
import { MaterialHeaderButtons } from '../components/appHeaderIcon';
import { Item } from 'react-navigation-header-buttons';
import { THEME } from '../THEME';

export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uploadAllPosts());
  }, [dispatch]);

  const allPosts = useSelector((state) => state.post.allPosts);
  const loading = useSelector((state) => state.post.loading);

  const goToPost = (post) => {
    navigation.navigate('PostScreen', {
      itemId: post.id,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialHeaderButtons>
          <Item
            title="Take photo"
            iconName="camera-enhance"
            onPress={() => navigation.navigate('CreateScreen')}
          />
        </MaterialHeaderButtons>
      ),
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

  if(loading) {
    return (
      <View style={styles.center}>
<ActivityIndicator color={THEME.MAIN_COLOR}/>
    </View>
    )
    
  }

  if(!allPosts.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={{alignSelf:'center', fontSize: 18, fontFamily: 'open-regular'}}>
          No posts
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={allPosts}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
