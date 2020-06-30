import axios from "axios";
import { apiUrl } from "../../config/constants";

export function storeRecipes(data) {
  return { type: "FETCH_RECIPES", payload: data };
}

export function fetchRecipes() {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/recipes`);
    console.log("response", response.data);
    dispatch(storeRecipes(response.data));
  };
}
