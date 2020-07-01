import { combineReducers } from "redux";
import recipesSliceReducer from "./Recipes/reducer";
import oneRecipeSliceReducer from "./RecipeDetails/reducer";

const reducer = combineReducers({
  recipes: recipesSliceReducer,
  recipe: oneRecipeSliceReducer,
});

export default reducer;
