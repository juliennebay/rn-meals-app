import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white"
  },
  //header text styling
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
};

//the "regular screen" that shows all the available meals
const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

//the screen ("FavouriteScreen.js") that only shows the user's faved meals
const FavNavigator = createStackNavigator(
  {
    Favs: FavouritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MealsFavTabNavigator = createBottomTabNavigator(
  {
    //the value "MealsNavigator" is the function above (this is the content of the first tab - the key - called "Meals")
    //the navigationOptions can also be used directly in the component (as we can see in other screens) - but not in this case
    //the navigationOptions can be applied above, in const MealsNavigator instead as well.
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          //the "tintColor" below is the activeTintColor in line 69.
          return (
            <Ionicons
              name="ios-restaurant"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        }
      }
    },
    //second tab on the bottom of the screen -- Favs
    Favs: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          //the "tintColor" below is the activeTintColor in line 52.
          return (
            <Ionicons name="ios-star" size={24} color={tabInfo.tintColor} />
          );
        }
      }
    }
  },
  {
    //you can add the second argument to add styling
    tabBarOptions: {
      labelStyle: {
        fontFamily: "open-sans-bold"
      },
      activeTintColor: Colors.secondaryColor
    }
  }
);

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

//the drawer navigator is ABOVE the bottom tab navigator in the hierarchy
//***  this is why I'm exporting MainNavigator under "export default" ***
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      //the drawerLabel is what's shown to the users in the drawer navigation dropdown menu
      navigationOptions: { drawerLabel: "Meals" }
    },
    Filters: FiltersNavigator
  },
  //you can add the second argument to add styling
  {
    contentOptions: {
      activeTintColor: Colors.secondaryColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);

export default createAppContainer(MainNavigator);
