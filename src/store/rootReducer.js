import { combineReducers } from "redux";
import recipesSliceReducer from "./Recipes/reducer";

const reducer = combineReducers({
  recipes: recipesSliceReducer,
});

export default reducer;
