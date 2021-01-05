import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RecipesListScreen from '../screens/RecipesListScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import NewRecipeScreen from '../screens/NewRecipeScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

const RecipesNavigator = createStackNavigator(
  {
    Recipes: RecipesListScreen,
    RecipeDetail: RecipeDetailScreen,
    NewRecipe: NewRecipeScreen,
    Map: MapScreen
    
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(RecipesNavigator);
