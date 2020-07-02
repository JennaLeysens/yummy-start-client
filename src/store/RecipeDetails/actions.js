import axios from "axios";
import { apiUrl } from "../../config/constants";

export function storeOneRecipe(data) {
  return { type: "FETCH_ONE_RECIPE", payload: data };
}

export function updateRecipe(data) {
  return { type: "ADD_LIKET", payload: data };
}

export function fetchOneRecipe(id) {
  return async (dispatch, getState) => {
    const oneResponse = await axios.get(`${apiUrl}/recipes/${id}`);
    console.log("one response", oneResponse.data);
    dispatch(storeOneRecipe(oneResponse.data));
  };
}

export function addLike() {
  return async (dispatch, getState) => {
    const recipe = getState().recipe.recipe;
    console.log("add like action", recipe);
    const response = await axios.patch(`${apiUrl}/recipes/like/${recipe.id}`);
    console.log("like", response);
    dispatch(updateRecipe(response));
  };
}
