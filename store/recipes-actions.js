import * as FileSystem from 'expo-file-system';
import { insertRecipe, fetchRecipes} from '../helpers/db';

export const ADD_RECIPE = 'ADD_RECIPE';
export const SET_RECIPES = 'SET_RECIPES';

export const addRecipe = (title,image) => {
  return async dispatch => {
    console.log('IMMMMAGE');
    console.log(image);
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    console.log(fileName);
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertRecipe(
        title,
        newPath,
        'Dummy address',
        15.6,
        12.3
      );
      console.log(dbResult);
      dispatch({ type: ADD_RECIPE, recipeData: { title: title, image: newPath } });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadRecipes = () => {
  return async dispatch => {
      try {
          const dbResult = await fetchRecipes();
          console.log(dbResult);
          dispatch({ type: SET_RECIPES, recipes: dbResult.rows._array });
      } catch (err) {
          throw err;
      }
  };
};