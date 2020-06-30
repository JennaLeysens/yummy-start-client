import { combineReducers } from "redux";
import recipesSliceReducer from "./recipes/reducer";

const reducer = combineReducers({
  recipesSliceReducer,
});

export default reducer;
