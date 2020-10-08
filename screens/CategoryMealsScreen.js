import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = props => {
  //the string inside getParam MUST MATCH THE KEY inside params object in CategoriesScreen.js
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displaydMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  //display a message if there's nothing being displayed (after filtering out the meals)
  if (displaydMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found. Check your filters, maybe?</DefaultText>
      </View>
    );
  }

  //props.navigation must be forwarded because MealList is not part of the stacked pages (see MealsNavigator.js)
  return <MealList listData={displaydMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CategoryMealsScreen;
