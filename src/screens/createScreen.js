import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { MaterialHeaderButtons } from '../components/appHeaderIcon';
import { Item } from 'react-navigation-header-buttons';
import { addPost } from '../store/actionCreators';
import { useDispatch } from 'react-redux';
import { PhotoPicker } from '../components/photoPicker';

export const CreateScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const imgRef = useRef();
  const dispatch = useDispatch();

  const  photoPickImage = (uri) => {
    imgRef.current = uri;
  }

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

  const saveHandler = () => {
    const post = {
      //id: Date.now().toString(),
      date: new Date().toJSON(),
      text: text,
      img: imgRef,
      booked: false,
    };

    dispatch(addPost(post));
    navigation.navigate('MainScreen');

    setText('');
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Create new Post:</Text>
          <TextInput style={styles.textarea} placeholder="type here..." value={text} onChangeText={setText} multiline
          />
          <PhotoPicker onPick={photoPickImage}/>
          <Button title="create" onPress={saveHandler} disabled={!text}/>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10,
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  },
});
