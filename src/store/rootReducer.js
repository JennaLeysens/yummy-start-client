import { combineReducers } from "redux";
import recipesSliceReducer from "./recipes/reducer";

const reducer = combineReducers({
  recipes: recipesSliceReducer,
});

export default reducer;
