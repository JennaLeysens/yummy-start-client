import { combineReducers } from "redux";
import recipesSliceReducer from "./Recipes/reducer";
import oneRecipeSliceReducer from "./RecipeDetails/reducer";
import tagsSliceReducer from "./Tags/reducer";

const reducer = combineReducers({
  recipes: recipesSliceReducer,
  recipe: oneRecipeSliceReducer,
  tags: tagsSliceReducer,
});

export default reducer;
