import React, {useState, useEffect} from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export const PhotoPicker = ({onPick}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
       const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.7,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      onPick(result.uri);
    }
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200}} />}
    </View>
  );
}