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

const NewRecipeScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [s3Key, setS3Key] = useState('');
  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath, s3Key) => {
    setSelectedImage(imagePath);
    setS3Key(s3Key);
};

  const saveRecipeHandler = () => {
    dispatch(recipesActions.addRecipe(titleValue, selectedImage, s3Key));
    props.navigation.goBack();
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
        <ImagePicker onImageTaken={imageTakenHandler} pickedImage={selectedImage}/>
        <Button title="Save Recipe" color={Colors.primary} onPress={saveRecipeHandler} disabled={(selectedImage == null)}/>
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
