import { ADD_RECIPE, SET_RECIPES } from './recipes-actions';
import Recipe from '../models/recipe';

const initialState = {
  recipes: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        recipes: action.recipes.map(
          recipe => new Recipe(recipe.id.toString(), recipe.title, recipe.imageUri)
        )
      };
    case ADD_RECIPE:
      const newRecipe = new Recipe(action.recipeData.id.toString(), action.recipeData.title, action.recipeData.image);
      return {
        recipes: state.recipes.concat(newRecipe)
      };
    default:
      return state;
  }
};
