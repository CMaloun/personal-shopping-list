import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as recipesActions from '../store/recipes-actions';
import ImagePicker from '../components/ImagePicker';
import * as ImagePicker2 from 'expo-image-picker'

const NewRecipeScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
};

  const saveRecipeHandler = () => {
    dispatch(recipesActions.addRecipe(titleValue, selectedImage));
    props.navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker2.launchImageLibraryAsync({
      mediaTypes: ImagePicker2.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      exif: true
    });

    console.log(result);

  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler}/>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        <Button title="Save Recipe" color={Colors.primary} onPress={saveRecipeHandler} />
      </View>
    </ScrollView>
  );
};

NewRecipeScreen.navigationOptions = {
  headerTitle: 'Add Recipe'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewRecipeScreen;
