import React, {useState} from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
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
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      exif: true,
      base64 : true
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const s3photo = await Storage.put("file-" + Date.now() + ".jpeg", blob, {
      contentType: "image/jpeg"
    });

    await Predictions.identify({
      text: {
        source: {
          key: s3photo.key,
          level: "public" //optional, default is the configured on Storage category
        },
        format: "PLAIN" // Available options "PLAIN", "FORM", "TABLE", "ALL"
      }
    }).then(response => console.log(response)).catch(err => console.log(err));

      
    
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (<Text>No image picked yet.</Text>):(
        <Image style={styles.image} source={{uri: pickedImage}}/>)}
      </View>
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
