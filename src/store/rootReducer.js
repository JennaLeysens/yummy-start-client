import { combineReducers } from "redux";
import recipesSliceReducer from "./Recipes/reducer";
import oneRecipeSliceReducer from "./RecipeDetails/reducer";
import tagsSliceReducer from "./Tags/reducer";
import userSliceReducer from "./User/reducer";
import appstateSliceReducer from "./Appstate/reducer";

const reducer = combineReducers({
  recipes: recipesSliceReducer,
  recipe: oneRecipeSliceReducer,
  tags: tagsSliceReducer,
  user: userSliceReducer,
  loading: appstateSliceReducer,
});

export default reducer;
