import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../Appstate/actions";
import { setErrorMessage } from "../User/actions";

export function storeOneRecipe(data) {
  return { type: "FETCH_ONE_RECIPE", payload: data };
}

export function updateRecipe(data) {
  return { type: "ADD_LIKE", payload: data };
}

export function fetchOneRecipe(id) {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const oneResponse = await axios.get(`${apiUrl}/recipes/${id}`);

      dispatch(storeOneRecipe(oneResponse.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMessage({ message: error.response.data.message }));
      } else {
        console.log(error.message);
      }
    }
  };
}

export function addLike() {
  return async (dispatch, getState) => {
    const recipe = getState().recipe.recipe;

    const response = await axios.patch(`${apiUrl}/recipes/like/${recipe.id}`);

    dispatch(updateRecipe(response.data));
  };
}
