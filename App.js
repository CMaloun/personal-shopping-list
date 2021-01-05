import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Amplify from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'
import RecipesNavigator from './navigation/RecipesNavigator';
import recipesReducer from './store/recipes-reducer';
import { init } from './helpers/db';
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });

const rootReducer = combineReducers({
  recipes: recipesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <RecipesNavigator />
    </Provider>
  );
}
