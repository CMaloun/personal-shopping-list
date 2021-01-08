import * as FileSystem from 'expo-file-system';
import { API, graphqlOperation } from '@aws-amplify/api';
import { listRecipeIdentifications } from '../graphql/queries';
import { createRecipeIdentification, updateRecipeIdentification } from '../graphql/mutations';
//import { insertRecipe, fetchRecipes} from '../helpers/db';
import Amplify, {
  Storage, Predictions
} from "aws-amplify";

export const ADD_RECIPE = 'ADD_RECIPE';
export const SET_RECIPES = 'SET_RECIPES';

export const addRecipe = (title,image, s3Key) => {
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
      /*const dbResult = await insertRecipe(
        title,
        newPath,
        'Dummy address',
        15.6,
        12.3
      );
      console.log(dbResult);*/
      console.log('yes 1');
    /*const response = await fetch(image);
    const blob = await response.blob();
    const s3photo = await Storage.put("file-" + Date.now() + ".jpeg", blob, {
      contentType: "image/jpeg"
    });
    console.log('yes 2');*/
    const creationRecipe = await API.graphql(
      graphqlOperation(createRecipeIdentification, {
        input: {
          s3Key: s3Key,
          title: title,
          imageUri: image,
          FileSystemPath: newPath,
          description: ''
        }}));
        console.log('yes 2');

     await Predictions.identify({
      text: {
        source: {
          key: s3Key,
          level: "public" //optional, default is the configured on Storage category
        },
        format: "PLAIN" // Available options "PLAIN", "FORM", "TABLE", "ALL"
      }
    }).then(async response => {await API.graphql(
      graphqlOperation(updateRecipeIdentification, {
        input: {
          id: creationRecipe.data.createRecipeIdentification.id,
          description : response.text.fullText
        }}));})
    .catch(err => console.log(err));
  
        
      dispatch({ type: ADD_RECIPE, recipeData: { id:creationRecipe.data.createRecipeIdentification.id, title: title, image: newPath } });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadRecipes = () => {
  return async dispatch => {
      try {
          //const dbResult = await fetchRecipes();
          const response = await API.graphql(graphqlOperation(listRecipeIdentifications));
          //console.log(dbResult);
          dispatch({ type: SET_RECIPES, recipes: response.data.listRecipeIdentifications.items });
      } catch (err) {
          throw err;
      }
  };
};