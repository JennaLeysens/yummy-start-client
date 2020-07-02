import { combineReducers } from "redux";
import recipesSliceReducer from "./Recipes/reducer";
import oneRecipeSliceReducer from "./RecipeDetails/reducer";
import tagsSliceReducer from "./Tags/reducer";
import userSliceReducer from "./User/reducer";

const reducer = combineReducers({
  recipes: recipesSliceReducer,
  recipe: oneRecipeSliceReducer,
  tags: tagsSliceReducer,
  user: userSliceReducer,
});

export default reducer;
