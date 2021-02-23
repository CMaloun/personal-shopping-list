import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { S3Image } from 'aws-amplify-react-native';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
var Airtable = require('airtable');
const levenshtein = require('fast-levenshtein');
const levenshtein_2 = require('js-levenshtein');

const RecipeDetailScreen = props => {
  var base = new Airtable({apiKey: 'keyLaJVqlFAksaijl'}).base('appYMSONifj5xUlKL');

  
  const recipeId = props.navigation.getParam('recipeId');
  const selectedRecipe = useSelector(state =>
    state.recipes.recipes.find(recipe => recipe.id === recipeId)
  );
  const s_ingredients= selectedRecipe.description.split(',');
  const ingredients=[
    /*{name:'aubergines'},
    {name:'poivrons rouges'}, 
    {name:'oignon'}, 
    {name:'ail'},
    {name:'thym'},
    {name:'sauce tomate'},
    {name:'chapelure'},*/
    {name:'pomme'},
    /*{name:'huile'},
  {name:'raclette'}*/]; 


    ingredients.forEach(ing => { 
    base('Imported table').select({
      // Selecting the first 3 records in Grid view:
      //maxRecords: 3,
      view: "Grid view",
      //filterByFormula: "NOT(FIND('Pomme Reinette',{Name})<0)"
      }).eachPage(function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
      
          records.forEach(function(record) {
              
              if (levenshtein_2(record.get('Name').toLowerCase(), ing.name.toLowerCase())<1000
                  && record.get('Name').toLowerCase().includes('pomme')) {
                if (record.get('Name').toLowerCase().includes(ing.name.toLowerCase())) {
                  console.log('Retrieved', record.get('Name'));
              }
                console.log('ingredient :' + ing.name);
                console.log(record.get('Name').toLowerCase());
                console.log(levenshtein_2(record.get('Name').toLowerCase(), ing.name.toLowerCase()));
              }
          });
      
          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
      
      }, function done(err) {
          if (err) { console.error(err); return; }
      });
  
  });

  base('Imported table').find('recN0vVNCaQnL9mkO', function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.id);
  });

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectedRecipe.imageUri }} style={styles.image} />
      <S3Image imgKey={selectedRecipe.s3Key}  style={styles.image} style={{ width: 200, height: 200 }}/>
      {
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{(selectedRecipe.description) }</Text>
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
