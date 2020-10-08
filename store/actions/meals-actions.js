//unique identifier
export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";
export const SET_FILTERS = "SET_FILTERS";

//need a function that creates an action
//this will be used in the reducer (meals.js)
export const toggleFavourite = id => {
  return { type: TOGGLE_FAVOURITE, mealId: id };
};

//filterSettings will be an object with 4 different true/false values (gluten-free, vegan, etc.)
export const setFilters = filterSettings => {
  return { type: SET_FILTERS, filters: filterSettings };
};
