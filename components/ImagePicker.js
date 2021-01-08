import React, {useState} from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImagePicker2 from 'expo-image-picker'
import Amplify, {
  Storage, Predictions
} from "aws-amplify";

import Colors from '../constants/Colors';

const ImgPicker = props => {
  const [pickedImage, setPickedImage]= useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return;
    }
    setPickedImage(null);
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      exif: true,
      base64 : true
    });

    setPickedImage(image.uri);
    console.log(image.uri);
    

    const response = await fetch(image.uri);
    const blob = await response.blob();
    await Storage.put("file-" + Date.now() + ".jpeg", blob, {
      contentType: "image/jpeg"
    }).then(s3photo => props.onImageTaken(image.uri, s3photo.key))
    .catch(err => console.log(err));
  };
  const pickImage = async () => {
    setPickedImage(null);
    let result = await ImagePicker2.launchImageLibraryAsync({
      mediaTypes: ImagePicker2.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      exif: true
    });
    if (result.cancelled) {
      console.log("No image picked")
      return;
    }
    console.log(result.uri);
    setPickedImage(result.uri);
    const response = await fetch(result.uri);
    const blob = await response.blob();
    await Storage.put("file-" + Date.now() + ".jpeg", blob, {
      contentType: "image/jpeg"
    }).then(s3photo => props.onImageTaken(result.uri, s3photo.key))
    .catch(err => console.log(err));
    console.log(result.uri);

  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (<Text>No image picked yet.</Text>):(
        <Image style={styles.image} source={{uri: pickedImage}}/>)}
        
      </View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
