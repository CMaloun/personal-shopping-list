import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { S3Image } from 'aws-amplify-react-native';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';

const RecipeDetailScreen = props => {
  const recipeId = props.navigation.getParam('recipeId');
  const uri = "https://native02basescreense1191342ab72840bc82571693fec154051-dev.s3.eu-west-1.amazonaws.com/public/file-1610054574046.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAUOPZE2RDJWDUKZYG%2F20210107%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20210107T212306Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJGMEQCIDhLf0cjvMqB9qZ%2BfCJ51i1%2F5V1YVLVEBxLF8OAVzyMXAiAZ%2FtlvMZdZxIPyssTNIB1Wq%2BTvqL3OucFQ7lXjcXSIlSqRBghPEAIaDDMwNjAwMjA1NjI2MiIM6uVUnDQYMH8vkPasKu4F0x9oeVeSAJCb6nJNFJTBJiNrhDpSiaGuK17aWMNzLkIxunSu3I%2BHN0aQrYMND4RtkVXaAvFPBbe2fFQgIOFLbXdsVsrFPh28CBjDpsnWdrU5AryGaX7f3K2aJWWdkWOFTGHSPj9MBgRaIbcW2fNtUCWufVy2TnGj%2FbCf8ZRVDxEU8%2FbptsVnze8cjyF4pOD8scdOP4L%2BmmAPDeYud%2BKAvHX%2FhwrffZfSY77EBhfcfNnQU9kE7lQ7%2BcvEaWwWjb%2FMMJQwPwIgMw6ISAMogX9Auxc6THfAH0CIzYbmq36%2F2XcQdmnUbCvsEo%2Bram9iMhD6vVGRwh0srHY2mnQEsWEBCsCRyidW2JSav3mV%2F%2BPp0ZVOktq5keN3M3Cwm%2B9SJOkwv%2BKADmCWbadKYv0w6c%2BfDWKKvmuKt7K3fAEolVYwrBXFhCKnQ7OnyNLUFoDq8yX3xS0L6kqWFsybtI9awPoFiih%2FrcAySTHHPoyAGZ1v3Ta7JvKjm3dHK3oK5KxhKPrgJYWfgP4cs0N1pxsYPJqGIrJu1%2FKC3mnXv5XqO7B4VNHWETf2585RjPhrxlo6lyIfy8yXfnS2wCLaTYSzMu4IxTbcwPf303eCNSIq7AJRTxMPfF%2B72kdbTPOccbIqBPTnMKZ0Keid5E95sh9r6DAMLJ%2Fyx2DT1%2B%2BoJZK1VYSx36y3zXON2pa74Yr2y8LmisdWl%2BHIbUoCnEDq%2B0Oolg1ym5t2ke99x1U5vWs8l7Bch5A6WYjskXPf5HeB5tMc5ZIn%2BQZdanIywfrvJp3uRWwLw95SOfpXwYD%2BtxwCgkkX7oX9E%2FVHo7a7vRR5MDEblr6H%2FAiYVt3sUVz9mk5NZgV1c0h2FzChXhDPw63fPjGp8XKKw9GWw2E3yDybgsenOz0wo3ZeBI6lTgDDcKeyfB3fcPk%2FNwcxYutPPvY8rGm%2BZkBKCLQXUEcQDz2%2Ff3iREZl5GF7qLZdkCkdKL46xCXGrdPmdVx6g1fF3EJGNybNTMK733f8FOogCgwuEDBxCMGYDvuYcl4m7XOI%2FWmz4GAktnNUIlzqfNTfFMK0wJIlJ7MFTTKRXktGB07yw1WHXoHIhQNjdU7ijWvBBNvYEkqf%2FVV3v21SCA00%2Ftsvv4axz5WEDkWa7i%2Bj2VA9GFQjWlQ%2FcOjKBBEBBySi45pd2BW1p%2FZ1Me59yaP5NlDAZELRQvHlcXUA4ABz0ipESyxyf9IDyCQcKeSGNaaJulMQBPyuGnNm4l8I4aQnXWO72eov6yncVto%2FAPyFNtBaShAnG4qRZZeIdjn6u%2FFjx6V0XFu%2FIo1FXEPF5Tgz9ByKkszl0hZY3wpvB6gK8n8XrMAOAlxhlZZaVF32uX5TzwIdcvgmz&X-Amz-Signature=7599e91581a1fbf8486a1bfcebb0a3b4933122316ba97637c634ab9ba982bdde&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-react-native-%40aws-sdk%2Fclient-s3%2F1.0.0-rc.4%20aws-amplify%2F3.8.7%20react-native&x-id=GetObject";
  const selectedRecipe = useSelector(state =>
    state.recipes.recipes.find(recipe => recipe.id === recipeId)
  );
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectedRecipe.imageUri }} style={styles.image} />
      <S3Image imgKey={selectedRecipe.s3Key}  style={styles.image} style={{ width: 200, height: 200 }}/>
      {
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedRecipe.description}</Text>
        </View>
        }
    </ScrollView>
  );
};

RecipeDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('recipeTitle')
  };
};


const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default RecipeDetailScreen;
