import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../Appstate/actions";

export function storeOneRecipe(data) {
  return { type: "FETCH_ONE_RECIPE", payload: data };
}

export function updateRecipe(data) {
  return { type: "ADD_LIKE", payload: data };
}

export function fetchOneRecipe(id) {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const oneResponse = await axios.get(`${apiUrl}/recipes/${id}`);
    console.log("one response", oneResponse.data);
    dispatch(storeOneRecipe(oneResponse.data));
    dispatch(appDoneLoading());
  };
}

export function addLike() {
  return async (dispatch, getState) => {
    const recipe = getState().recipe.recipe;
    console.log("add like action", recipe);
    const response = await axios.patch(`${apiUrl}/recipes/like/${recipe.id}`);
    console.log("like", response.data);
    dispatch(updateRecipe(response.data));
  };
}
