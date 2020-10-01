import React from "react";

import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";

const CategoryMealsScreen = props => {
  //the string inside getParam MUST MATCH THE KEY inside params object in CategoriesScreen.js
  const catId = props.navigation.getParam("categoryId");

  const displaydMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

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

export default CategoryMealsScreen;
