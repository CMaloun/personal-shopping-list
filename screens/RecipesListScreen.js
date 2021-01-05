import React,{ useEffect } from 'react';
import { View, Text, StyleSheet, Platform , FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from  '../components/HeaderButton'
import RecipeItem from '../components/RecipeItem';
import { useSelector, useDispatch } from 'react-redux';
import * as recipesActions from '../store/recipes-actions';


const RecipesListScreen = props => {
  const recipes = useSelector(state => state.recipes.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipesActions.loadRecipes());
  }, [dispatch]);

  return (
    <FlatList
    data={recipes}
    keyExtractor={item => item.id}
    renderItem={itemData => (
      <RecipeItem
        image={itemData.item.imageUri}
        title={itemData.item.title}
        onSelect={() => {
          props.navigation.navigate('RecipeDetail', {
            recipeTitle: itemData.item.title,
            recipeId: itemData.item.id
          });
        }}
      />
    )}
  />
  );
};

RecipesListScreen.navigationOptions = navData => {
   return { 
     headerTitle: 'All Recipes',
     headerRight : <HeaderButtons HeaderButtonComponent={HeaderButton}>
       <Item title="Add Recipe"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
              navData.navigation.navigate('NewRecipe');
          }} />
     </HeaderButtons>
    };
};

const styles = StyleSheet.create({});

export default RecipesListScreen;
