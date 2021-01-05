import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';

const RecipeDetailScreen = props => {
  const recipeId = props.navigation.getParam('recipeId');
  const selectedRecipe = useSelector(state =>
    state.recipes.recipes.find(recipe => recipe.id === recipeId)
  );
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectedRecipe.imageUri }} style={styles.image} />
      {/*<View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showMapHandler}
        />
  </View>*/}
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
