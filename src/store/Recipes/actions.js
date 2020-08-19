import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../Appstate/actions";

export function storeRecipes(data) {
  return { type: "FETCH_RECIPES", payload: data };
}

export function fetchRecipes() {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/recipes`);
    dispatch(storeRecipes(response.data));
    dispatch(appDoneLoading());
  };
}
